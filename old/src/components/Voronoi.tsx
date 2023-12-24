import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import { Button } from '@mui/material';

type Point = [number, number];

const record2array = (record: Record<string, number>): string[] => {
  const resultArray: string[] = [];
  for (const [key, value] of Object.entries(record)) {
    for (let i = 0; i < value; i++) {
      resultArray.push(key);
    }
  }
  return resultArray;
}

export type VoronoiProps = {
  colors: Record<string, number>
}

const Voronoi: React.FC<VoronoiProps> = ({ colors }): JSX.Element => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [toggler, toggle] = useState<boolean>(false)

  useEffect(() => {
    if (!colors) return;

    const htmlColors = record2array(colors)

    const width = 200; // Set your desired width for the SVG
    const height = 200; // Set your desired height for the SVG

    const points: Point[] = htmlColors.map(() => ([Math.random() * width, Math.random() * height]));

    const svg = d3.select(svgRef.current);

    // Clear previous content in the SVG before redrawing
    // svg.selectAll('*').remove();

    svg.attr('width', width)
      .attr('height', height);

    const voronoi = d3.Delaunay.from(points).voronoi([0, 0, width, height]);

    svg.selectAll<SVGPathElement, Point[]>('path')
      .data(voronoi.cellPolygons())
      .join('path')
      .attr('d', d => `M${d.join('L')}Z`)
      .attr('fill', (_, i) => htmlColors[i])
      .attr('stroke', 'black');

  }, [colors, toggler]);

  return <Button onClick={() => toggle(!toggler)}><svg ref={svgRef}></svg></Button>
};

export default Voronoi;