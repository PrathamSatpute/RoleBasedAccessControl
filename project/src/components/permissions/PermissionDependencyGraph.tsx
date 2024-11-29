import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useRBACStore } from '../../store/rbacStore';

export default function PermissionDependencyGraph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const { permissions, roles } = useRBACStore();

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const nodes = permissions.map(p => ({ 
      id: p.id, 
      name: p.name,
      x: undefined,
      y: undefined
    }));
    const links = roles.flatMap(role => 
      role.permissions.map(p => ({
        source: role.id,
        target: p.id
      }))
    );

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id))
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6);

    const node = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 5)
      .attr('fill', '#69b3a2');

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y);
    });

    return () => {
      simulation.stop();
    };
  }, [permissions, roles]);

  return <svg ref={svgRef} className="w-full h-full" />;
} 