---
title: Basic Store Implementation
sidebar_label: Basic Store
sidebar_position: 1
---

import AdFitTopFixed from "@site/src/uis/AdFitTopFixed";

# Basic Store Implementation

<AdFitTopFixed />

This example shows how to implement a basic in-app purchase store using expo-iap.

## Key Features Demonstrated

### 1. Connection Management

- Automatic connection handling with `useIAP`
- Loading states for connection and products

### 2. Product Loading

- Loading both products and subscriptions
- Error handling for failed product fetches

### 3. Purchase Flow

- Initiating purchases with `requestPurchase`
- Handling purchase updates and errors
- Proper transaction finishing

### 4. Receipt Validation

- Server-side receipt validation with platform-specific handling
- Error handling for validation failures

### 5. User Experience

- Visual feedback for purchase states
- Appropriate error messages
- Loading indicators

## Platform Differences

### Purchase Request Parameters

**Important**: iOS and Android have completely different parameter structures for `requestPurchase`:

**iOS Structure:**

```tsx
await requestPurchase({
  request: {
    sku: productId,
    andDangerouslyFinishTransactionAutomatically: false,
  },
});
```

**Android Structure:**

```tsx
await requestPurchase({
  request: {skus: [productId]},
});
```

**Platform-specific Implementation:**

```tsx
if (Platform.OS === 'ios') {
  await requestPurchase({
    request: {
      sku: productId,
      // Set to false for manual transaction finishing
      andDangerouslyFinishTransactionAutomatically: false,
    },
  });
} else {
  await requestPurchase({
    request: {skus: [productId]},
  });
}
```

### Key iOS Options

- **`andDangerouslyFinishTransactionAutomatically: false`**:
  - **Recommended**: Set to `false` to manually handle transaction finishing
  - This allows proper receipt validation before completing the transaction
  - Prevents race conditions and ensures proper purchase flow

### Purchase Object Properties

Purchase objects have different properties on iOS and Android. When accessing platform-specific properties, TypeScript type casting is required:

```tsx
// For Android-specific properties
const purchaseToken = (purchase as ProductPurchaseAndroid).purchaseTokenAndroid;
const packageName = (purchase as ProductPurchaseAndroid).packageNameAndroid;

// For iOS-specific properties
const transactionReceipt = purchase.transactionReceipt; // Available on both platforms
```

### Receipt Validation

Receipt validation requires different approaches:

- **iOS**: Send `transactionReceipt` to Apple's validation servers
- **Android**: Send `purchaseToken` and `packageName` to Google Play validation

This is handled in the `validatePurchase` function with platform-specific logic.

## Usage

```tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Store from './Store';

export default function App() {
  return (
    <NavigationContainer>
      <Store />
    </NavigationContainer>
  );
}
```

## Customization

You can customize this example by:

1. **Styling**: Modify the `styles` object to match your app's design
2. **Product IDs**: Update `PRODUCT_IDS` and `SUBSCRIPTION_IDS` with your actual product IDs
3. **Validation**: Implement proper server-side receipt validation
4. **Error Handling**: Add more specific error handling for your use case
5. **Features**: Add features like purchase restoration, subscription management, etc.

## Next Steps

- Implement proper [receipt validation](../guides/purchases#receipt-validation)
- Add [purchase restoration](../guides/purchases#purchase-restoration)
- Handle [subscription management](../api/methods/core-methods#deeplinktosubscriptions)
- Add comprehensive [error handling](../guides/troubleshooting)
