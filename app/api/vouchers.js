import faker from 'faker';

function generateVoucher(index = Math.round(Math.random() * Number.MAX_SAFE_INTEGER)) {
  const isPaperVoucher = Math.random() < 0.5;
  const faceValue = Math.round((Math.random() + 1) * 10000);
  const askingPrice = Math.round(faceValue * (1.5 - Math.random()));

  return {
    brand_image_url: `${faker.image.imageUrl(40, 40)}?${index}`,
    brand_name: faker.company.companyName(),
    serial_number: Number.parseInt(faker.finance.account(), 10),
    cvv: isPaperVoucher ? null : Number.parseInt(faker.finance.account(), 10),
    face_value: faceValue,
    asking_price: askingPrice,
    discount: Math.round((100 * (faceValue - askingPrice)) / faceValue),
    seller: faker.name.findName(),
    created: +faker.date.past(),
    id: faker.random.uuid(),
    notes: faker.lorem.sentence(),
    currency: faker.helpers.randomize(['GBP', 'US', 'EUR']),
    paper_voucher: isPaperVoucher,
    bulk_id: faker.random.uuid(),
    invoice_number: faker.random.uuid(),
    order_number: index,
    status: faker.helpers.randomize([null, 'Active', 'Decline']),
  };
}

function generateVouchers(n = 10, current = 0) {
  return n <= 0 ? [] : generateVouchers(n - 1, current + 1).concat(generateVoucher(current));
}

const vouchers = generateVouchers(Math.round(Math.random() * 20));

export default {
  get(id = null) {
    if (!id) {
      return Promise.resolve(vouchers);
    }
    const voucher = vouchers.find(item => item.id === id);
    return voucher ? Promise.resolve(voucher) : Promise.reject();
  },
  post(voucher = {}) {
    const voucherIndex = vouchers.findIndex(item => item.id === voucher.id);
    if (voucherIndex === -1) {
      return Promise.reject();
    }
    vouchers[voucherIndex] = voucher;
    return Promise.resolve();
  },
};
