const drawingUtils = {
    drawLine(ctx, x1, y1, x2, y2){
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.stroke();
    },

    drawRectangle(ctx,x1,y1,width,height){
        ctx.beginPath();
        ctx.rect(x1,y1,width,height);
        ctx.stroke();
    },

    drawEllipse(ctx, centerX, centerY, radiusX, radiusY){
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
        ctx.stroke();
    },

    drawArrow(ctx, x1,y1,x2,y2,headLength,headAngle){
        const dx = x2-x1;
        const dy = y2-y1;

        const angle = Math.atan2(dy,dx);
        //Draw the main line
        drawLine(ctx, x1, y1, x2, y2);

        //Draw the arrowHead
        drawLine(ctx, x2, y2, x2-headLength*Math.cos(angle-headAngle),  y2-headLength*Math.sin(angle-headAngle));
        drawLine(ctx, x2, y2, x2-headLength*Math.cos(angle+headAngle),  y2-headLength*Math.sin(angle+headAngle));

        ctx.stroke();
    },

}


export const{drawArrow,drawEllipse,drawLine, drawRectangle}=drawingUtils;