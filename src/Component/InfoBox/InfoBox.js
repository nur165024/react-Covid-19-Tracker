import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

const InfoBox = ({ title, cases, total }) => {
  return (
    <Card className="infobox">
      <CardContent>
        <Typography className="infobox__title">{title}</Typography>
        <h3 className="infobox__cases">{cases}</h3>
        <Typography className="infobox__total">{total} Total</Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
