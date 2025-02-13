"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/lib/utils";

import PropTypes from 'prop-types';

const Drawer = ({ shouldScaleBackground = true, ...props }) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);

Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef((props, ref) => {
  const { className, ...restProps } = props;
  return (
    <DrawerPrimitive.Overlay
      ref={ref}
      className={cn("fixed inset-0 z-50 bg-black/80", className)}
      {...restProps}
    />
  );
});
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef((props, ref) => {
  const { className, children, ...restProps } = props;
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
          className
        )}
        {...restProps}
      >
        <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
});
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = (props) => {
  const { className, ...restProps } = props;
  return (
    <div
      className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
      {...restProps}
    />
  );
};
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = (props) => {
  const { className, ...restProps } = props;
  return (
    <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...restProps} />
  );
};
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef((props, ref) => {
  const { className, ...restProps } = props;
  return (
    <DrawerPrimitive.Title
      ref={ref}
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...restProps}
    />
  );
});
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef((props, ref) => {
  const { className, ...restProps } = props;
  return (
    <DrawerPrimitive.Description
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...restProps}
    />
  );
});
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};



//proto types 
DrawerOverlay.propTypes={
  className:PropTypes.bool
};
Drawer.propTypes={
  shouldScaleBackground:PropTypes.bool
};

DrawerContent.propTypes={
  className:PropTypes.string,
  children:PropTypes.string,
};
DrawerHeader.propTypes={
  className:PropTypes.string
};
DrawerFooter.propTypes={
  className:PropTypes.string
};
DrawerTitle.propTypes={
  className:PropTypes.string
};
DrawerDescription.propTypes={
  className:PropTypes.string
};