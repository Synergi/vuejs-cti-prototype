// fsm/transitions

const offPhone = "offPhone";
const onPhonePaused = "onPhonePaused";
const onPhonePausedOnLine1UnallocManCallDialling =
  "onPhonePausedOnLine1UnallocManCallDialling";
const onPhonePausedOnLine1UnallocManCall = "onPhonePausedOnLine1UnallocManCall";
const onPhonePausedOnLine1UnallocManCallFailed =
  "onPhonePausedOnLine1UnallocManCallFailed";
const onPhoneAvailable = "onPhoneAvailable";
const onPhoneAvailableOnLine1UnallocManCallDialling =
  "onPhoneAvailableOnLine1UnallocManCallDialling";
const onPhoneAvailableOnLine1UnallocManCall =
  "onPhoneAvailableOnLine1UnallocManCall";
const onPhoneAvailableOnLine1UnallocManCallFailed =
  "onPhoneAvailableOnLine1UnallocManCallFailed";
const onPhoneLine1ManCallDialling = "onPhoneLine1ManCallDialling";
const onPhoneLine1ManCallFailed = "onPhoneLine1ManCallFailed";
const onPhoneLine1ManCall = "onPhoneLine1ManCall";
const onPhoneLine1ManCallHold = "onPhoneLine1ManCallHold";
const onPhoneLine1InboundCall = "onPhoneLine1InboundCall";
const onPhoneLine1InboundHold = "onPhoneLine1InboundHold";
const onPhoneWrapping = "onPhoneWrapping";
const onManualPreview = "onManualPreview";
const onOutboundPreview = "onOutboundPreview";
const onPhoneLine1OutboundCallDialling = "onPhoneLine1OutboundCallDialling";
const onPhoneLine1OutboundCallFailed = "onPhoneLine1OutboundCallFailed";
const onPhoneLine1OutboundCall = "onPhoneLine1OutboundCall";
const onPhoneLine1OutboundHold = "onPhoneLine1OutboundHold";
const onOutboundWrapping = "onOutboundWrapping";

export const logoutStates = [offPhone, onPhonePaused];

export const key = "cti";

export const transitions = [
  {
    name: "connect",
    from: [offPhone],
    to: onPhonePaused
  },
  {
    name: "disconnect",
    from: [onPhonePaused],
    to: offPhone
  },
  {
    name: "pause",
    from: [onPhoneAvailable, onManualPreview],
    to: onPhonePaused
  },
  {
    name: "unpause",
    from: [onPhonePaused, onManualPreview],
    to: onPhoneAvailable
  },
  {
    name: "manualCall",
    from: [onPhonePaused, onPhoneAvailable, onManualPreview],
    to: onPhoneLine1ManCallDialling
  },
  {
    name: "manualCallPickup",
    from: [onPhoneLine1ManCallDialling],
    to: onPhoneLine1ManCall
  },
  {
    name: "unallocatedManualCallFromPaused",
    from: [onPhonePaused, onManualPreview],
    to: onPhonePausedOnLine1UnallocManCallDialling
  },
  {
    name: "unallocatedManualCallFromAvailable",
    from: [onPhoneAvailable, onManualPreview],
    to: onPhoneAvailableOnLine1UnallocManCallDialling
  },
  {
    name: "hangupToPaused",
    from: [
      onPhonePausedOnLine1UnallocManCallDialling,
      onPhonePausedOnLine1UnallocManCall,
      onPhonePausedOnLine1UnallocManCallFailed
    ],
    to: onPhonePaused
  },
  {
    name: "hangupToAvailable",
    from: [
      onPhoneAvailableOnLine1UnallocManCallDialling,
      onPhoneAvailableOnLine1UnallocManCall,
      onPhoneAvailableOnLine1UnallocManCallFailed
    ],
    to: onPhoneAvailable
  },
  {
    name: "pickupFailedFromAvailable",
    from: [onPhoneAvailableOnLine1UnallocManCallDialling],
    to: onPhoneAvailableOnLine1UnallocManCallFailed
  },
  {
    name: "pickupFailedFromPaused",
    from: [onPhonePausedOnLine1UnallocManCallDialling],
    to: onPhonePausedOnLine1UnallocManCallFailed
  },
  {
    name: "manualCallPickupFromAvailable",
    from: [onPhoneAvailableOnLine1UnallocManCallDialling],
    to: onPhoneAvailableOnLine1UnallocManCall
  },
  {
    name: "manualCallPickupFromPaused",
    from: [onPhonePausedOnLine1UnallocManCallDialling],
    to: onPhonePausedOnLine1UnallocManCall
  },
  {
    name: "hold",
    from: [onPhoneLine1ManCall],
    to: onPhoneLine1ManCallHold
  },
  {
    name: "unhold",
    from: [onPhoneLine1ManCallHold],
    to: onPhoneLine1ManCall
  },
  {
    name: "pickupFailed",
    from: [onPhoneLine1ManCallDialling],
    to: onPhoneLine1ManCallFailed
  },
  {
    name: "hangupFromFailedPickup",
    from: [onPhoneLine1ManCallFailed],
    to: onPhoneWrapping
  },
  {
    name: "inboundCallAllocated",
    from: [onPhoneAvailable, onPhonePaused],
    to: onPhoneLine1InboundCall
  },
  {
    name: "hold",
    from: [onPhoneLine1InboundCall],
    to: onPhoneLine1InboundHold
  },
  {
    name: "unhold",
    from: [onPhoneLine1InboundHold],
    to: onPhoneLine1InboundCall
  },
  {
    name: "hangup",
    from: [
      onPhoneLine1ManCallDialling,
      onPhoneLine1InboundCall,
      onPhoneLine1ManCall,
      onPhoneLine1InboundHold,
      onPhoneLine1ManCallHold
    ],
    to: onPhoneWrapping
  },
  {
    name: "transferComplete",
    from: [onPhoneLine1InboundCall, onPhoneLine1ManCall],
    to: onPhoneWrapping
  },
  {
    name: "wrapPause",
    from: [
      onPhoneLine1InboundCall,
      onPhoneLine1ManCall,
      onPhoneLine1OutboundCall,
      onOutboundPreview,
      onOutboundWrapping,
      onPhoneWrapping
    ],
    to: onPhonePaused
  },
  {
    name: "wrapReady",
    from: [
      onPhoneLine1InboundCall,
      onPhoneLine1ManCall,
      onPhoneLine1OutboundCall,
      onOutboundPreview,
      onOutboundWrapping,
      onPhoneWrapping
    ],
    to: onPhoneAvailable
  },
  {
    name: "manualPreview",
    from: [onPhonePaused, onPhoneAvailable],
    to: onManualPreview
  },
  {
    name: "outboundPreview",
    from: [onPhoneAvailable, onPhonePaused],
    to: onOutboundPreview
  },
  {
    name: "outboundCall",
    from: [onOutboundPreview],
    to: onPhoneLine1OutboundCallDialling
  },
  {
    name: "pickupFailed",
    from: [onPhoneLine1OutboundCallDialling],
    to: onPhoneLine1OutboundCallFailed
  },
  {
    name: "hangupFromFailedPickup",
    from: [onPhoneLine1OutboundCallFailed],
    to: onOutboundWrapping
  },
  {
    name: "outboundPickup",
    from: [onPhoneLine1OutboundCallDialling],
    to: onPhoneLine1OutboundCall
  },
  {
    name: "hold",
    from: [onPhoneLine1OutboundCall],
    to: onPhoneLine1OutboundHold
  },
  {
    name: "unhold",
    from: [onPhoneLine1OutboundHold],
    to: onPhoneLine1OutboundCall
  },
  {
    name: "outboundHangup",
    from: [
      onPhoneLine1OutboundCall,
      onPhoneLine1OutboundCallDialling,
      onPhoneLine1OutboundHold
    ],
    to: onOutboundWrapping
  },
  {
    name: "outboundWrap",
    from: [onOutboundWrapping],
    to: onOutboundPreview
  },
  {
    name: "outboundWrapToAvailable",
    from: [onOutboundWrapping],
    to: onPhoneAvailable
  },
  {
    name: "outboundWrapToPaused",
    from: [onOutboundWrapping],
    to: onPhonePaused
  },
  {
    name: "hangup",
    from: [
      onPhoneLine1OutboundCall,
      onPhoneLine1OutboundCallDialling,
      onPhoneLine1OutboundHold
    ],
    to: onOutboundWrapping
  },
  {
    name: "transferComplete",
    from: [onPhoneLine1OutboundCall],
    to: onOutboundWrapping
  }
];
