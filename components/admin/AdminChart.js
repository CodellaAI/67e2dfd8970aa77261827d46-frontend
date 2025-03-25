
'use client'

import { useEffect, useRef } from 'react'

export default function AdminChart() {
  const canvasRef = useRef(null)
  
  useEffect(() => {
    if (typeof window !== 'undefined' && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      
      // Simple chart rendering without external libraries
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const salesData = [5200, 4800, 6000, 5400, 7200, 8100, 7800, 8600, 9200, 10500, 11200, 12500]
      
      const width = canvasRef.current.width
      const height = canvasRef.current.height
      const padding = 40
      const chartWidth = width - padding * 2
      const chartHeight = height - padding * 2
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height)
      
      // Draw axes
      ctx.beginPath()
      ctx.moveTo(padding, padding)
      ctx.lineTo(padding, height - padding)
      ctx.lineTo(width - padding, height - padding)
      ctx.strokeStyle = '#e5e7eb'
      ctx.stroke()
      
      // Draw y-axis labels
      const maxValue = Math.max(...salesData) * 1.1
      const yStep = chartHeight / 5
      
      for (let i = 0; i <= 5; i++) {
        const y = height - padding - i * yStep
        const value = Math.round(maxValue * i / 5)
        
        ctx.beginPath()
        ctx.moveTo(padding - 5, y)
        ctx.lineTo(width - padding, y)
        ctx.strokeStyle = '#f3f4f6'
        ctx.stroke()
        
        ctx.font = '10px Arial'
        ctx.fillStyle = '#6b7280'
        ctx.textAlign = 'right'
        ctx.fillText(`$${value}`, padding - 10, y + 3)
      }
      
      // Draw x-axis labels and bars
      const barWidth = chartWidth / months.length * 0.6
      const barSpacing = chartWidth / months.length
      
      for (let i = 0; i < months.length; i++) {
        const x = padding + i * barSpacing + barSpacing / 2
        
        // Draw label
        ctx.font = '10px Arial'
        ctx.fillStyle = '#6b7280'
        ctx.textAlign = 'center'
        ctx.fillText(months[i], x, height - padding + 15)
        
        // Draw bar
        const barHeight = (salesData[i] / maxValue) * chartHeight
        const barX = x - barWidth / 2
        const barY = height - padding - barHeight
        
        // Gradient fill
        const gradient = ctx.createLinearGradient(0, barY, 0, height - padding)
        gradient.addColorStop(0, '#0ea5e9')
        gradient.addColorStop(1, '#38bdf8')
        
        ctx.fillStyle = gradient
        ctx.fillRect(barX, barY, barWidth, barHeight)
      }
      
      // Draw line chart
      ctx.beginPath()
      ctx.moveTo(padding + barSpacing / 2, height - padding - (salesData[0] / maxValue) * chartHeight)
      
      for (let i = 1; i < months.length; i++) {
        const x = padding + i * barSpacing + barSpacing / 2
        const y = height - padding - (salesData[i] / maxValue) * chartHeight
        ctx.lineTo(x, y)
      }
      
      ctx.strokeStyle = '#0369a1'
      ctx.lineWidth = 2
      ctx.stroke()
      
      // Draw points
      for (let i = 0; i < months.length; i++) {
        const x = padding + i * barSpacing + barSpacing / 2
        const y = height - padding - (salesData[i] / maxValue) * chartHeight
        
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fillStyle = '#0369a1'
        ctx.fill()
        ctx.strokeStyle = '#fff'
        ctx.lineWidth = 2
        ctx.stroke()
      }
    }
  }, [])
  
  return (
    <div className="w-full h-64">
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={300}
        className="w-full h-full"
      ></canvas>
    </div>
  )
}
