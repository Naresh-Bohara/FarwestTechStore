import React from 'react'
import { Badge } from "flowbite-react";
import { ucFirst } from '../../utilities/helpers';

export const StatusBadge = ({status}) => {
  return (
    <>
     <Badge color={status==="active" ? "teal" : "red"}>{ucFirst(status)}</Badge>
    </>
  )
}

