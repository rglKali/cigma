import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

type Point = [number, number];

function getColor(char: string) {
  switch (char) {
    case 'j':
      return 'yellow';
    case 'b':
      return 'blue';
    case 'n':
      return 'black';
    case 'r':
      return 'red';
    case 'v':
      return 'green';
    default:
      return null; // Handle cases where the character doesn't match any mapping
  }
}

export default (colors: string): JSX.Element => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!colors) return;

    const htmlColors = colors.split('').map(char => getColor(char));

    const width = 400; // Set your desired width for the SVG
    const height = 400; // Set your desired height for the SVG

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

  }, [colors]);

  return <svg ref={svgRef}></svg>;
};
