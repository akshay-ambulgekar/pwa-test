import React from "react";
import { Accordion, AccordionContent, AccordionItem } from "@/Components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

import PropTypes from 'prop-types';

const AccordionComponent = ({ items ,accordionAllCapsClass=''}) => {
  return (
    <div className="">
      <Accordion type="single" collapsible className="w-full">
        {items?.map((item) => (
          <AccordionItem className={`pb-1  border-none `} value={item.id} key={item.id} >
            <AccordionPrimitive.Header className="flex">
              <AccordionPrimitive.Trigger className={`${accordionAllCapsClass? accordionAllCapsClass:' body-sm-bold '}   custom-text-grey800 flex flex-1 items-center justify-between py-3 text-left transition-all [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180`}>
                {item.title}
                <Plus className="shrink-0 opacity-100 ml-4 transition-transform duration-200 " size={16} strokeWidth={2} aria-hidden="true" />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionContent className="pb-2 body-sm font-normal custom-text-grey900 border-none">
              {/* Add border-none here to ensure no borders */}
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default AccordionComponent;

AccordionComponent.propTypes={
  items:PropTypes.array,
  accordionAllCapsClass:PropTypes.string
};