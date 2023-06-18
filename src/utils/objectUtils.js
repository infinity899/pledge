import { PledgeType } from '@/utils/constants';

export function copyFields(source, fieldNames) {
  const value = {};
  for(let i = 0; i < fieldNames.length; i += 1) {
    value[fieldNames[i]] = source[fieldNames[i]];
  }
  return value;
}

export function sortPledgeItems(products = []) {
  const standardProducts = products
    .filter(p => p.type === PledgeType.STANDARD)
    .sort((a, b) => (a.id - b.id));
  const donationProducts = products
    .filter(p => p.type === PledgeType.DONATION)
    .sort((a, b) => (a.id - b.id));
  return [...standardProducts, ...donationProducts];
}
