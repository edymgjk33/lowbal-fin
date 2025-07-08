import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Home, Car, Bike, Smartphone, Laptop, Sofa, CheckCircle } from "lucide-react";

interface CategorySelectorProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const categories = [
  {
    id: 'real-estate',
    name: 'Real Estate',
    icon: Home,
    description: 'Houses, apartments, land',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    id: 'cars',
    name: 'Cars',
    icon: Car,
    description: 'Vehicles, trucks, SUVs',
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  {
    id: 'motorcycles',
    name: 'Motorcycles',
    icon: Bike,
    description: 'Bikes, scooters, ATVs',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  {
    id: 'gadgets',
    name: 'Gadgets',
    icon: Smartphone,
    description: 'Phones, tablets, watches',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  {
    id: 'electronics',
    name: 'Electronics',
    icon: Laptop,
    description: 'Computers, TVs, audio',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  {
    id: 'furniture',
    name: 'Furniture',
    icon: Sofa,
    description: 'Chairs, tables, decor',
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200'
  }
];

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onCategorySelect
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Category</h3>
        <p className="text-gray-600">Select the type of item you're negotiating for to get specialized strategies</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <Card
              key={category.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                isSelected 
                  ? `${category.bgColor} ${category.borderColor} border-2 shadow-lg` 
                  : 'bg-white border border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onCategorySelect(category.id)}
            >
              <CardContent className="p-6 text-center relative">
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                )}
                <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">{category.name}</h4>
                <p className="text-xs text-gray-600">{category.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySelector;