function getPackagingType(size, shippingMethod) {
  let packageMaterial = '';
  switch (size) {
    case 'XLarge':
    case 'Large':
      packageMaterial = 'Madera';
      break;
    case 'Medium':
      packageMaterial = 'Cartón';
      break;
    case 'Small':
    case 'XSmall':
      packageMaterial = 'Plástico';
      break;
  }

  let packageFilling = '';
  switch (shippingMethod) {
    case 'air':
      packageFilling = packageMaterial === 'Plástico' ? "Bolsas con burbuja" : "Bolitas de Plastoformo";
      break;
    case 'land':
      packageFilling = "Bolitas de Plastoformo";
      break;
    case 'sea':
      packageFilling = "Bolitas absorbentes de humedad + Bolsas con burbuja";
      break;
  }

  return {
    packageMaterial,
    packageFilling
  };
}

function getShippingPrice(destination, shippingMethod, quantity, price, packageMaterial) {
  const subtotal = quantity * price;
  let discounts = 0;
  let additionalCosts = 0;

  if (quantity > 100) {
    discounts += subtotal * 0.2;
  }

  switch (packageMaterial) {
    case 'Madera':
      additionalCosts += subtotal * 0.05;
      break;
    case 'Cartón':
      discounts += subtotal * 0.01;
      break;
    case 'Plástico':
      additionalCosts += subtotal * 0.1;
      break;
  }

  switch (destination) {
    case 'USA':
      additionalCosts += subtotal * 0.18;
      break;
    case 'Bolivia':
      additionalCosts += subtotal * 0.13;
      break;
    case 'India':
      additionalCosts += subtotal * 0.19;
      break;
    default:
      additionalCosts += subtotal * 0.15;
      break;
  }

  switch (shippingMethod) {
    case 'air':
      shippingCosts = 30 * quantity;
      additionalCosts += shippingCosts;
      discounts += quantity > 1000 ? shippingCosts * 0.15 : 0; 
      break;
    case 'land':
      additionalCosts += 10 * quantity;
      break;
    case 'sea':
      additionalCosts += 400;
      break;
  }

  return {
    subtotal,
    additionalCosts,
    discounts
  };
}

module.exports = { getPackagingType, getShippingPrice };