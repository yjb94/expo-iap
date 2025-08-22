/* global jest */
module.exports = {
  requireNativeModule: jest.fn(() => ({
    sync: jest.fn(),
    isEligibleForIntroOffer: jest.fn(),
    subscriptionStatus: jest.fn(),
    currentEntitlement: jest.fn(),
    latestTransaction: jest.fn(),
    beginRefundRequest: jest.fn(),
    showManageSubscriptions: jest.fn(),
    getReceiptData: jest.fn(),
    isTransactionVerified: jest.fn(),
    getTransactionJws: jest.fn(),
    validateReceiptIOS: jest.fn(),
    presentCodeRedemptionSheet: jest.fn(),
    getAppTransaction: jest.fn(),
    getPromotedProduct: jest.fn(),
    buyPromotedProduct: jest.fn(),
    addListener: jest.fn(),
    removeListeners: jest.fn(),
  })),
  EventEmitter: jest.fn(() => ({
    addListener: jest.fn(),
    removeListener: jest.fn(),
    removeAllListeners: jest.fn(),
  })),
};