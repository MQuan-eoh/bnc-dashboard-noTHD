# AC ID Configuration Guide

To distinguish between different Air Conditioners (e.g., Product Room vs. BD Room) and prevent data mixing, a new `acId` field has been added to the dashboard.

## How it works

The dashboard now expects an additional configuration parameter (Realtime Config) to be sent from the E-RA widget. This parameter serves as the unique identifier for the Air Conditioner.

## Configuration Steps

1.  **Open E-RA Widget Settings:** Go to the configuration page for your widget on the E-RA platform.
2.  **Add a New Realtime Config:** Add a new configuration item.
    - **Position:** This must be the **22nd** item in the list (Index 21).
    - **Name:** You can name it `AC_ID` or `Device_ID`.
    - **Value:** Map this to a tag or a static value that represents the AC ID (e.g., "AC-PRODUCT-01", "AC-BD-01").
3.  **Save:** Save the configuration.