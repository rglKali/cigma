import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import { Button } from '@mui/material';
import { useTheme } from '../hooks';

type Point = [number, number];

export type VoronoiProps = {
  colors: Array<string>
}

const Voronoi: React.FC<VoronoiProps> = ({ colors }): JSX.Element => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [toggler, toggle] = useState<boolean>(false)
  const { theme } = useTheme()

  useEffect(() => {
    if (!colors) return;

    const width = 200; // Set your desired width for the SVG
    const height = 200; // Set your desired height for the SVG

    const points: Point[] = colors.map(() => ([Math.random() * width, Math.random() * height]));

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
      .attr('fill', (_, i) => colors[i])
      .attr('stroke', theme == 'light' ? 'black' : 'white');

  }, [colors, toggler, theme]);

  return <Button onClick={() => toggle(!toggler)}><svg ref={svgRef}></svg></Button>
};

export default Voronoi;