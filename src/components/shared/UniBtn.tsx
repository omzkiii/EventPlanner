"use client"
import React, { useState } from 'react'
import { Button } from '../ui';
import { Loader2 } from 'lucide-react';
import { IconType } from '@icons-pack/react-simple-icons';
import "@/assets/extras.css";

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;


export default function UniBtn({
    Text,
    onClick,
    Icon,
  }: {
    Text: string;
    onClick: () => void | Promise<void>;
    Icon?: IconComponent | IconType;
  }) {
    const [isLoading, setIsLoading] = useState(false);
  
    const handleClick = async () => {
      try {
        setIsLoading(true);
        await onClick();
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <Button className="UniBtn" onClick={handleClick} disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="animate-spin h-5 w-5" />
        ) : (
          <>
            {Icon && <Icon className="w-5 h-5 mr-2 text-secondary" />}
            {Text}
          </>
        )}
      </Button>
    );
  }