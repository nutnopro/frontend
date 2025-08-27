module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};

// src/data/wheelData.js
export const wheelData = {
  '15': [
    {
      id: 1,
      name: 'Sport Classic',
      brand: 'Racing Pro',
      price: '8,900',
      material: 'Alloy',
      weight: '12 kg',
      pattern: '5-Spoke',
      color: 'Silver'
    },
    {
      id: 2,
      name: 'Urban Style',
      brand: 'City Drive',
      price: '7,500',
      material: 'Steel',
      weight: '14 kg',
      pattern: '6-Spoke',
      color: 'Black'
    },
    {
      id: 3,
      name: 'Eco Design',
      brand: 'Green Wheel',
      price: '6,800',
      material: 'Alloy',
      weight: '11 kg',
      pattern: '10-Spoke',
      color: 'White'
    },
    {
      id: 4,
      name: 'Street Racing',
      brand: 'Speed Max',
      price: '9,200',
      material: 'Forged',
      weight: '10 kg',
      pattern: 'Mesh',
      color: 'Gunmetal'
    },
    {
      id: 5,
      name: 'Classic Chrome',
      brand: 'Vintage Auto',
      price: '8,100',
      material: 'Chrome',
      weight: '15 kg',
      pattern: '8-Spoke',
      color: 'Chrome'
    }
  ],
  '16': [
    {
      id: 6,
      name: 'Performance Pro',
      brand: 'Racing Elite',
      price: '10,500',
      material: 'Forged',
      weight: '11 kg',
      pattern: '5-Spoke',
      color: 'Matte Black'
    },
    {
      id: 7,
      name: 'Modern Design',
      brand: 'Urban Tech',
      price: '9,800',
      material: 'Alloy',
      weight: '13 kg',
      pattern: 'Y-Spoke',
      color: 'Anthracite'
    },
    {
      id: 8,
      name: 'Luxury Edition',
      brand: 'Premium Drive',
      price: '12,200',
      material: 'Forged',
      weight: '12 kg',
      pattern: 'Multi-Spoke',
      color: 'Polished'
    },
    {
      id: 9,
      name: 'Sport Touring',
      brand: 'Road Master',
      price: '11,100',
      material: 'Alloy',
      weight: '13 kg',
      pattern: 'Twin-Spoke',
      color: 'Silver'
    },
    {
      id: 10,
      name: 'Dynamic Style',
      brand: 'Flex Rim',
      price: '9,500',
      material: 'Cast',
      weight: '14 kg',
      pattern: '7-Spoke',
      color: 'Titanium'
    }
  ],
  '17': [
    {
      id: 11,
      name: 'Ultra Sport',
      brand: 'Max Performance',
      price: '13,500',
      material: 'Carbon Fiber',
      weight: '9 kg',
      pattern: '5-Spoke',
      color: 'Carbon'
    },
    {
      id: 12,
      name: 'Executive Line',
      brand: 'Luxury Motors',
      price: '15,800',
      material: 'Forged',
      weight: '11 kg',
      pattern: 'Multi-Spoke',
      color: 'Polished'
    },
    {
      id: 13,
      name: 'Racing Evolution',
      brand: 'Speed Demon',
      price: '14,200',
      material: 'Magnesium',
      weight: '8 kg',
      pattern: 'Mesh',
      color: 'Gold'
    },
    {
      id: 14,
      name: 'Premium Cast',
      brand: 'Elite Wheels',
      price: '16,500',
      material: 'Forged',
      weight: '10 kg',
      pattern: '6-Spoke',
      color: 'Brushed'
    },
    {
      id: 15,
      name: 'Street Performance',
      brand: 'Urban Racer',
      price: '13,900',
      material: 'Alloy',
      weight: '12 kg',
      pattern: 'Split-Spoke',
      color: 'Matte Grey'
    }
  ],
  '18': [
    {
      id: 16,
      name: 'Super Sport',
      brand: 'Turbo Rim',
      price: '18,500',
      material: 'Carbon Fiber',
      weight: '10 kg',
      pattern: '5-Spoke',
      color: 'Carbon'
    },
    {
      id: 17,
      name: 'Luxury Sport',
      brand: 'Diamond Cut',
      price: '21,200',
      material: 'Forged',
      weight: '12 kg',
      pattern: 'Diamond Cut',
      color: 'Polished'
    },
    {
      id: 18,
      name: 'Racing Master',
      brand: 'Pro Circuit',
      price: '19,800',
      material: 'Magnesium',
      weight: '9 kg',
      pattern: 'Track',
      color: 'Orange'
    },
    {
      id: 19,
      name: 'Elite Performance',
      brand: 'Champion Wheels',
      price: '22,500',
      material: 'Titanium',
      weight: '8 kg',
      pattern: 'Concave',
      color: 'Titanium'
    },
    {
      id: 20,
      name: 'Dynamic Pro',
      brand: 'Advanced Rim',
      price: '20,100',
      material: 'Forged',
      weight: '11 kg',
      pattern: 'Turbine',
      color: 'Gunmetal'
    }
  ],
  '19': [
    {
      id: 21,
      name: 'Ultimate Sport',
      brand: 'Extreme Performance',
      price: '25,500',
      material: 'Carbon Fiber',
      weight: '9 kg',
      pattern: '5-Spoke',
      color: 'Gloss Carbon'
    },
    {
      id: 22,
      name: 'Luxury Master',
      brand: 'Platinum Series',
      price: '28,900',
      material: 'Forged',
      weight: '11 kg',
      pattern: 'Luxury Multi',
      color: 'Platinum'
    },
    {
      id: 23,
      name: 'Racing Legend',
      brand: 'Championship Pro',
      price: '27,200',
      material: 'Magnesium',
      weight: '8 kg',
      pattern: 'Racing',
      color: 'Red'
    },
    {
      id: 24,
      name: 'Premium Elite',
      brand: 'Diamond Luxury',
      price: '31,500',
      material: 'Titanium',
      weight: '7 kg',
      pattern: 'Elite Diamond',
      color: 'Rose Gold'
    },
    {
      id: 25,
      name: 'Super Dynamic',
      brand: 'Ultimate Drive',
      price: '26,800',
      material: 'Carbon Fiber',
      weight: '9 kg',
      pattern: 'Dynamic Flow',
      color: 'Matte Carbon'
    }
  ]
};

export const getWheelsBySize = (size) => {
  return wheelData[size] || [];
};

export const getWheelById = (id) => {
  for (const size in wheelData) {
    const wheel = wheelData[size].find(w => w.id === id);
    if (wheel) return wheel;
  }
  return null;
};