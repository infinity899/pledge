import axios from 'axios';
import moment from 'moment';
import i18n from '@/i18n';

// Fake data.
import wallets from './fake_wallet_api.json';

export const USER_TOKEN_KEY = 'USER-TOKEN';
export const AUTHORIZATION_HEADER = 'Authorization';

export const getBaseURL = () => {
  const apiEndpoint = process.env.VUE_APP_API_HOST || 'http://localhost:5000';
  return `${apiEndpoint}/api/`;
};

export const getAccessToken = () => {
  const accessToken = localStorage.getItem(USER_TOKEN_KEY);
  return accessToken;
};

export const client = axios.create({
  baseURL: getBaseURL(),
  timeout: 5000,
  method: 'GET',
});

function jsonConfig(config) {
  config.headers = {
    ...config.headers,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  return config;
}

function authConfig(config) {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${getAccessToken()}`,
  };
  return config;
}

function request(config) {
  if(config.data) {
    jsonConfig(config);
  }
  return client.request(config);
}

function processProject(project) {
  project.start_time = moment.unix(project.start_time);
  project.end_time = moment.unix(project.end_time);
  (project.updates || []).forEach((update) => {
    update.date = moment(update.date);
  });
  (project.milestones || []).forEach((milestone) => {
    milestone.date = moment(milestone.date);
  });
  return project;
}

function processProjectsData(data) {
  (data.projects || []).forEach((project) => {
    processProject(project);
  });
  return data;
}

function processRewardsData({ pledge }) {
  const sortedProducts = pledge.products.sort((a, b) => a.reward.id - b.reward.id);
  return { ...pledge, products: sortedProducts };
}

export function userLogin(auth) {
  const config = {
    url: 'tokens/',
    method: 'POST',
    auth,
  };
  return request(config);
}

export function userLogout() {
  const config = authConfig({
    url: 'tokens/',
    method: 'DELETE',
  });
  return request(config);
}

export function resendConfirmation(email) {
  const config = {
    url: '/users/profile/email/resendconfirmation/',
    method: 'POST',
    data: { email },
  };
  return request(config);
}

export function userRegister(user) {
  return new Promise((resolve, reject) => {
    request({
      url: 'users/',
      data: user,
      method: 'POST',
    })
      .then(resp => resolve(resp))
      .catch((err) => {
        if(err.response && err.response.data && err.response.data.userMessage) {
          reject(new Error(err.response.data.userMessage));
        } else {
          reject(new Error(i18n.t('auth.errors.NETWORK_FAILURE')));
        }
      });
  });
}

export function confirmEmail(code) {
  return request({
    url: 'users/profile/email/confirm/',
    method: 'POST',
    data: { code },
  });
}

export function requestSocialAuth(type) {
  const config = {
    url: `/auth/${type.toLowerCase()}_authorize/`,
    method: 'GET',
    withCredentials: true,
  };
  return request(config);
}

export function socialLogin(type) {
  const config = {
    url: `/auth/${type.toLowerCase()}_login/`,
    method: 'GET',
    withCredentials: true,
  };
  return request(config);
}

export function getUserProfile(userId) {
  return request({
    url: `/users/${userId}`,
    method: 'GET',
  });
}

export function getProfile() {
  const config = authConfig({
    url: 'users/profile/',
  });
  return request(config);
}

export function updateProfile(profileData) {
  const config = authConfig({
    url: 'users/profile/',
    data: profileData,
    method: 'PUT',
  });
  return request(config);
}

export function updatePassword({ password, newPassword }) {
  const config = authConfig({
    url: 'users/profile/password/',
    data: { password, new_password: newPassword },
    method: 'PUT',
  });

  return request(config);
}

export function getCategories() {
  return request({ url: 'categories/' });
}

export async function getProjects({ filter, categoryId, fundedPercent, page, perPage }) {
  const { data } = await request({
    url: `projects/filter/${filter}/`,
    params: {
      category_id: categoryId,
      almost_funded_percent: fundedPercent,
      page,
      per_page: perPage,
    },
  });
  return processProjectsData(data);
}

export async function getCreatedProjects({ userId, page, perPage }) {
  const config = authConfig({
    url: `/users/${userId}/created/`,
    method: 'GET',
    params: { page, per_page: perPage },
  });
  const { data } = await request(config);
  return processProjectsData(data);
}

export async function getUserPledgedProjects({ page, perPage }) {
  const config = authConfig({
    url: '/users/profile/pledged/',
    method: 'GET',
    params: { page, per_page: perPage },
  });
  const { data } = await request(config);
  return processProjectsData(data);
}

export async function getPledgedProjects({ userId, page, perPage }) {
  const config = authConfig({
    url: `/users/${userId}/pledged/`,
    method: 'GET',
    params: { page, per_page: perPage },
  });
  const { data } = await request(config);
  return processProjectsData(data);
}

export async function getPledge(projectId) {
  const config = authConfig({
    url: `projects/${projectId}/pledges/me/`,
  });
  const { data } = await request(config);
  return processRewardsData(data);
}

export function getProjectPledges(projectId, query) {
  const config = authConfig({
    url: `projects/${projectId}/pledges/${query || ''}`,
  });
  return request(config);
}

export async function setPledgeItem({ projectId, variantId, quantity }) {
  try {
    const config = authConfig({
      url: `/projects/${projectId}/pledges/me/item/${variantId}/`,
      method: 'PUT',
      data: { quantity },
    });
    const { data } = await request(config);
    return processRewardsData(data);
  } catch(err) {
    throw new Error(err);
  }
}

export function setDonation({ projectId, amount }) {
  const config = authConfig({
    url: `/projects/${projectId}/pledges/me/item/donation/`,
    method: 'PUT',
    data: { amount_usd: amount },
  });
  return request(config);
}

export function pledgeCheckout(projectId) {
  const config = authConfig({
    url: `projects/${projectId}/pledges/me/checkout/`,
    method: 'POST',
  });
  return request(config);
}

export function pledgeCancel(projectId) {
  const config = authConfig({
    url: `projects/${projectId}/pledges/me/cancel/`,
    method: 'POST',
  });
  return request(config);
}

export async function subscribeProject(projectId, subscribe) {
  const config = authConfig({
    url: `projects/${projectId}/subscribe/`,
    method: 'POST',
    data: { subscribe },
  });
  const { data: { subscribed } } = await request(config);
  return subscribed;
}

export async function getProjectDetail(projectId) {
  const config = authConfig({
    url: `projects/${projectId}/`,
    method: 'GET',
  });
  const { data: { project } } = await request(config);
  return processProject(project);
}

export async function getCreatorProjectDetail(projectId) {
  const config = authConfig({
    url: `projects/private/${projectId}/`,
  });
  const { data: { project } } = await request(config);
  return processProject(project);
}

export function getQuestions(filter) {
  const f = filter ? filter.toLowerCase() : 'popular';
  return request({ url: `questions/${f}/` });
}

export function getQuestionDetail(questionId) {
  return request({ url: `question/${questionId}` });
}

export function createProject(projectData) {
  const config = authConfig({
    url: 'projects/',
    method: 'POST',
    data: projectData,
  });
  return request(config);
}

export function updateProject({ projectId, projectData }) {
  const config = authConfig({
    url: `projects/${projectId}/`,
    method: 'PUT',
    data: projectData,
  });
  return request(config);
}

export function deleteProject({ projectId }) {
  const config = authConfig({
    url: `projects/${projectId}/`,
    method: 'DELETE',
  });
  return request(config);
}

export function uploadProjectImage({ projectId, file, isHeader }) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('is_header', isHeader);
  const config = authConfig({
    url: `projects/${projectId}/images/`,
    method: 'POST',
    data: formData,
  });
  return request(config);
}

export function deleteProjectImage({ projectId, imageId }) {
  const config = authConfig({
    url: `projects/${projectId}/images/${imageId}/`,
    method: 'DELETE',
  });
  return request(config);
}

export function setHeaderImage({ projectId, imageId }) {
  const config = authConfig({
    url: `projects/${projectId}/main_image/${imageId}/`,
    method: 'PUT',
  });
  return request(config);
}

export function uploadProjectDocument({ projectId, file }) {
  const formData = new FormData();
  formData.append('file', file);
  const config = authConfig({
    url: `projects/${projectId}/documents/`,
    method: 'POST',
    data: formData,
  });
  return request(config);
}

export function deleteProjectDocument({ projectId, documentId }) {
  const config = authConfig({
    url: `projects/${projectId}/documents/${documentId}/`,
    method: 'DELETE',
  });
  return request(config);
}

export function createReward({ projectId, reward }) {
  const config = authConfig({
    url: `projects/${projectId}/rewards/`,
    method: 'POST',
    data: reward,
  });
  return request(config);
}

export function updateReward({ projectId, rewardId, reward }) {
  const config = authConfig({
    url: `projects/${projectId}/rewards/${rewardId}/`,
    method: 'PUT',
    data: reward,
  });
  return request(config);
}

export function deleteReward({ projectId, rewardId }) {
  const config = authConfig({
    url: `projects/${projectId}/rewards/${rewardId}/`,
    method: 'DELETE',
  });
  return request(config);
}

export function createRewardVariant({ projectId, rewardId, variant }) {
  const config = authConfig({
    url: `projects/${projectId}/rewards/${rewardId}/variants/`,
    method: 'POST',
    data: variant,
  });
  return request(config);
}

export function updateRewardVariant({ projectId, rewardId, variant }) {
  const config = authConfig({
    url: `projects/${projectId}/rewards/${rewardId}/variants/${variant.id}/`,
    method: 'PUT',
    data: variant,
  });
  return request(config);
}

export function deleteRewardVariant({ projectId, rewardId, variantId }) {
  const config = authConfig({
    url: `projects/${projectId}/rewards/${rewardId}/variants/${variantId}/`,
    method: 'DELETE',
  });
  return request(config);
}

export function updateVariantImage({ projectId, rewardId, variantId, file }) {
  const formData = new FormData();
  formData.append('file', file);
  const config = authConfig({
    url: `projects/${projectId}/rewards/${rewardId}/variants/${variantId}/image/`,
    data: formData,
    method: 'PUT',
  });
  return request(config);
}

export function createMilestone({ projectId, milestone }) {
  const config = authConfig({
    url: `projects/${projectId}/milestones/`,
    method: 'POST',
    data: milestone,
  });
  return request(config);
}

export function updateMilestone({ projectId, milestoneId, milestone }) {
  const config = authConfig({
    url: `projects/${projectId}/milestones/${milestoneId}/`,
    method: 'PUT',
    data: milestone,
  });
  return request(config);
}

export function deleteMilestone({ projectId, milestoneId }) {
  const config = authConfig({
    url: `projects/${projectId}/milestones/${milestoneId}/`,
    method: 'DELETE',
  });
  return request(config);
}

export function getUserWallets() {
  // @TODO: api call for wallet data.
  // const { data: { wallets } } = await request({ url: '/wallet/' });
  return wallets;
}

export function getExchangeRate() {
  return request({ url: '/ticker/plg_to_usd/' });
}

export function search({ query, page, perPage }) {
  return new Promise((resolve, reject) => {
    request({
      url: '/projects/search/',
      method: 'GET',
      params: { query, page, per_page: perPage },
    })
      .then((res) => {
        resolve(processProjectsData(res.data));
      })
      .catch(err => reject(err));
  });
}

export function getProjectFAQ(projectId) {
  const config = authConfig({
    url: `projects/${projectId}/faq/`,
  });
  return request(config);
}

export function addFAQItem({ projectId, question, answer }) {
  const config = authConfig({
    url: `projects/${projectId}/faq/`,
    method: 'POST',
    data: { question, answer },
  });
  return request(config);
}

export function updateFAQItem({ projectId, faqItemId, question, answer }) {
  const config = authConfig({
    url: `projects/${projectId}/faq/${faqItemId}/`,
    method: 'PUT',
    data: { question, answer },
  });
  return request(config);
}

export function deleteFAQItem({ projectId, faqItemId }) {
  const config = authConfig({
    url: `projects/${projectId}/faq/${faqItemId}/`,
    method: 'DELETE',
  });
  return request(config);
}

export function updateProfileImage(file) {
  const formData = new FormData();
  formData.append('file', file);
  const config = authConfig({
    url: '/users/profile/image/',
    data: formData,
    method: 'PUT',
  });
  return request(config);
}

export function getUserNotifications({ page, perPage, types }) {
  const config = authConfig({
    url: '/users/profile/notifications/',
    method: 'POST',
    data: {
      page,
      per_page: perPage,
      object_types: types,
    },
  });
  return request(config);
}

export function markNotificationRead(notificationId) {
  const config = authConfig({
    url: `/users/profile/notifications/${notificationId}/read/`,
    method: 'PUT',
  });
  return request(config);
}

export function markAllNotificationsRead() {
  const config = authConfig({
    url: '/users/profile/notifications/readAll/',
    method: 'PUT',
  });
  return request(config);
}

export function getUserPaymentMethods() {
  const config = authConfig({
    url: '/users/profile/payment_methods/',
    method: 'GET',
  });
  return request(config);
}

export function setUserDefaultPaymentMethod({ id }) {
  const config = authConfig({
    url: '/users/profile/payment_methods/default/',
    method: 'PUT',
    data: { id },
  });
  return request(config);
}

export function createUserPaymentMethod(paymentData) {
  const config = authConfig({
    url: '/users/profile/payment_methods/',
    method: 'POST',
    data: paymentData,
  });
  return request(config);
}

export function deletePaymentMethod({ id }) {
  const config = authConfig({
    url: `/users/profile/payment_methods/${id}/`,
    method: 'DELETE',
  });
  return request(config);
}

export function getCommentReplies({ commentId }) {
  const config = authConfig({
    url: `/comments/${commentId}/replies/`,
    method: 'GET',
  });
  return request(config);
}

export function getProjectCommentPermission({ projectId }) {
  const config = authConfig({
    url: `/projects/${projectId}/comments/user_permission/`,
    method: 'GET',
  });
  return request(config);
}

export function addProjectComment({ projectId, parentId, text }) {
  const config = authConfig({
    url: `/projects/${projectId}/comments/${parentId}/`,
    method: 'POST',
    data: { text },
  });
  return request(config);
}

export function voteComment({ projectId, commentId, vote }) {
  const config = authConfig({
    url: `/projects/${projectId}/comments/${commentId}/vote/`,
    method: 'PUT',
    data: { vote },
  });
  return request(config);
}

export function editComment({ commentId, text }) {
  const config = authConfig({
    url: `/comments/${commentId}/`,
    method: 'PUT',
    data: { text },
  });
  return request(config);
}

export function deleteComment({ commentId }) {
  const config = authConfig({
    url: `/comments/${commentId}/`,
    method: 'DELETE',
  });
  return request(config);
}

export function getReferralLinks(projectId) {
  const config = authConfig({
    url: `/projects/${projectId}/insights/referral_links/`,
    method: 'GET',
  });
  return request(config);
}

export function createReferralLink({ projectId, name }) {
  const config = authConfig({
    url: `/projects/${projectId}/insights/referral_links/`,
    method: 'POST',
    data: { name },
  });
  return request(config);
}

export function updateReferralLink({ projectId, linkId, name }) {
  const config = authConfig({
    url: `/projects/${projectId}/insights/referral_links/${linkId}/`,
    method: 'PUT',
    data: { name },
  });
  return request(config);
}

export function deleteReferralLink({ projectId, linkId }) {
  const config = authConfig({
    url: `/projects/${projectId}/insights/referral_links/${linkId}/`,
    method: 'DELETE',
  });
  return request(config);
}

export function getProjectUpdate({ projectId, updateId }) {
  const config = authConfig({
    url: `/projects/${projectId}/updates/${updateId}/`,
    method: 'GET',
  });
  return request(config);
}

export function createProjectUpdate(info) {
  const {
    projectId,
    name,
    description,
  } = info;
  const config = authConfig({
    url: `/projects/${projectId}/updates/`,
    method: 'POST',
    data: { name, description, public: info.public },
  });
  return request(config);
}

export function updateProjectUpdate(info) {
  const {
    updateId,
    projectId,
    name,
    description,
    draft,
  } = info;

  const config = authConfig({
    url: `/projects/${projectId}/updates/${updateId}/`,
    method: 'PUT',
    data: { name, description, public: info.public, draft },
  });
  return request(config);
}

export function deleteProjectUpdate({ projectId, updateId }) {
  const config = authConfig({
    url: `/projects/${projectId}/updates/${updateId}/`,
    method: 'DELETE',
  });
  return request(config);
}

export function getPaymentMethods() {
  const config = authConfig({
    url: '/users/profile/payment_methods/',
    method: 'GET',
  });
  return request(config);
}

export function createShippingAddress(address) {
  const config = authConfig({
    url: '/users/profile/shipping_addresses/',
    method: 'POST',
    data: address,
  });
  return request(config);
}

export function removeShippingAddress(id) {
  const config = authConfig({
    url: `/users/profile/shipping_addresses/${id}/`,
    method: 'DELETE',
  });
  return request(config);
}

export function createPaymentMethod(method) {
  const config = authConfig({
    url: '/users/profile/payment_methods/',
    method: 'POST',
    data: method,
  });
  return request(config);
}

export function startKYC() {
  const config = authConfig({
    url: '/users/profile/kyc/',
    method: 'GET',
  });
  return request(config);
}

export default request;
