import  { ClassValue,clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// clsx: condition classname
// twMerge: merge tailwin class


export function cn(...inputs: ClassValue[]){
    return twMerge(clsx(inputs))
}