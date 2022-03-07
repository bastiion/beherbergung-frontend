const uischema = {
  "type": "VerticalLayout",
  "elements": [
    {
      "type": "Control",
      "scope": "#/properties/name",
    },
    {
      "type": "HorizontalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/street"
        },
        {
          "type": "Control",
          "scope": "#/properties/streetNumber"
        }
      ]
    },
    {
      "type": "HorizontalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/postalCode"
        },
        {
          "type": "Control",
          "scope": "#/properties/city"
        }
      ]
    },
    {
      "type": "HorizontalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/emailAddress"
        },
        {
          "type": "Control",
          "scope": "#/properties/telephoneNumber"
        }
      ]
    },
    {
      "type": "HorizontalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/earliestAvailability"
        },
        {
          "type": "Control",
          "scope": "#/properties/maximumLengthOfStay"
        }
      ]
    },
    {
      "type": "Control",
      "scope": "#/properties/availableBeds"
    },
    {
      "type": "Control",
      "scope": "#/properties/street"
    },
    {
      "type": "Control",
      "scope": "#/properties/languages"
    },
    {
      "type": "Control",
      "scope": "#/properties/hasPets"
    },
    {
      "type": "Control",
      "scope": "#/properties/petsAllowed"
    }
  ]
}

export default uischema
