export const calculateCounterOffer = (price: number, selectedPlatform: string, category?: string): number => {
  let percentage = 0;
  
  // Category-specific negotiation percentages
  if (category) {
    switch (category) {
      case 'real-estate':
        percentage = Math.random() * 0.05 + 0.02; // 2-7% for real estate
        break;
      case 'cars':
        percentage = Math.random() * 0.15 + 0.10; // 10-25% for cars
        break;
      case 'motorcycles':
        percentage = Math.random() * 0.12 + 0.08; // 8-20% for motorcycles
        break;
      case 'electronics':
        percentage = Math.random() * 0.20 + 0.15; // 15-35% for electronics
        break;
      case 'gadgets':
        percentage = Math.random() * 0.18 + 0.12; // 12-30% for gadgets
        break;
      case 'furniture':
        percentage = Math.random() * 0.25 + 0.20; // 20-45% for furniture
        break;
      default:
        percentage = Math.random() * 0.15 + 0.15; // 15-30% default
    }
  } else {
    // Original platform-based logic as fallback
    if ((selectedPlatform === 'Zillow' || selectedPlatform === 'Facebook') && price > 5000) {
      percentage = Math.random() * 0.1 + 0.1; // 10-20%
    } else if ((selectedPlatform === 'eBay' || selectedPlatform === 'Craigslist') && price < 500) {
      percentage = Math.random() * 0.1 + 0.2; // 20-30%
    } else {
      percentage = Math.random() * 0.1 + 0.15; // 15-25% for other cases
    }
  }
  
  const reducedPrice = price * (1 - percentage);
  
  // Round down to appropriate increments based on price range
  if (reducedPrice > 10000) {
    return Math.floor(reducedPrice / 500) * 500; // Round to nearest $500
  } else if (reducedPrice > 1000) {
    return Math.floor(reducedPrice / 100) * 100; // Round to nearest $100
  } else if (reducedPrice > 100) {
    return Math.floor(reducedPrice / 50) * 50; // Round to nearest $50
  } else {
    return Math.floor(reducedPrice / 10) * 10; // Round to nearest $10
  }
};

export const generateNegotiationMessage = async (
  title: string, 
  originalPrice: number, 
  offer: number, 
  platform: string, 
  notes: string, 
  category?: string
): Promise<string> => {
  const prompt = `Create a polite, confident negotiation message for the following:
  - Item: ${title}
  - Category: ${category || 'general'}
  - Original Price: $${originalPrice}
  - My Offer: $${offer}
  - Platform: ${platform}
  - Additional Context: ${notes}
  
  Guidelines:
  - Be respectful but confident
  - Use category-specific language and approach
  - Use phrases like "Would you consider," "Based on the market," or "Happy to move forward if we can agree"
  - Keep it concise (2-3 sentences)
  - Sound professional but friendly
  - Don't be aggressive or pushy
  - Focus on being ready to move forward with the deal
  - Include category-specific benefits (e.g., quick closing for real estate, immediate pickup for electronics)`;

  try {
    // This is a placeholder for GPT-4 integration
    console.log('Generating message with prompt:', prompt);
    
    // Category-specific message templates
    const templates = {
      'real-estate': [
        `Hi! I'm very interested in your property at ${title}. I have pre-approval for financing and can close quickly. Based on recent comparables in the area, would you consider $${offer}? I'm ready to move forward immediately if we can agree on this price.`,
        `Hello! Your property looks perfect for what I'm looking for. I'm a qualified buyer with financing already arranged. Given the current market conditions, would you be open to $${offer}? I can provide proof of funds and close on your timeline.`,
        `Hi there! I'm interested in purchasing your property. I've been pre-approved and can offer a quick, smooth closing. Based on my research of the area, would you consider accepting $${offer}? Happy to discuss terms that work for both of us.`
      ],
      'cars': [
        `Hi! I'm very interested in your ${title}. I've been looking for exactly this model and I'm ready to purchase immediately. Based on current market values and the condition, would you consider $${offer}? I can come see it this week and complete the purchase with cash/financing.`,
        `Hello! Your ${title} looks great and exactly what I've been searching for. I have financing pre-approved and can complete the purchase quickly. Given the mileage and market conditions, would you be open to $${offer}? I'm available to view it at your convenience.`,
        `Hi there! I'm interested in your ${title}. I'm a serious buyer with cash/financing ready. Based on similar vehicles in the area, would you consider $${offer}? I can arrange to see it this weekend and finalize everything if we can agree on the price.`
      ],
      'electronics': [
        `Hi! I'm very interested in your ${title}. I've been looking for this exact model and I'm ready to purchase today. Based on current market prices, would you consider $${offer}? I can pick it up immediately with cash if we can agree on this price.`,
        `Hello! Your ${title} is exactly what I need. I'm ready to buy today and can pick it up at your convenience. Given the current retail prices, would you be open to $${offer}? Happy to complete the transaction quickly.`,
        `Hi there! I'm interested in purchasing your ${title}. I'm a serious buyer and can pick it up today with cash. Based on similar listings, would you consider accepting $${offer}? I can come get it whenever works for you.`
      ],
      'furniture': [
        `Hi! I'm very interested in your ${title}. I'm moving into a new place and this would be perfect. Based on similar pieces I've seen, would you consider $${offer}? I can arrange pickup this week and handle all the moving logistics.`,
        `Hello! Your ${title} looks exactly like what I've been searching for. I'm ready to purchase and can handle pickup/delivery. Given the current market, would you be open to $${offer}? I can come get it at your convenience.`,
        `Hi there! I'm interested in your ${title}. I have a truck and can pick it up immediately. Based on similar furniture listings, would you consider $${offer}? Happy to work with your schedule for pickup.`
      ]
    };

    const categoryTemplates = templates[category as keyof typeof templates] || [
      `Hi! I'm very interested in your ${title}. Based on similar listings I've seen, would you consider $${offer}? I'm ready to pick it up/move forward today if we can agree on this price.`,
      `Hello! Your ${title} looks great. I've been researching the market and wondering if you'd be open to $${offer}? Happy to arrange pickup at your convenience if this works for you.`,
      `Hi there! I'm interested in purchasing your ${title}. Would you consider accepting $${offer}? I'm a serious buyer and can complete the transaction quickly if we can agree on this.`
    ];
    
    return categoryTemplates[Math.floor(Math.random() * categoryTemplates.length)];
  } catch (error) {
    console.error('Error generating message:', error);
    return `Hi! I'm very interested in your ${title}. Would you consider $${offer}? I'm ready to move forward if we can agree on this price. Thank you!`;
  }
};