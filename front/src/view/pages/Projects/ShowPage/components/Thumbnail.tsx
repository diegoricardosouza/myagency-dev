import { useEffect, useState } from "react";

interface ThumbnailProps {
  src: string;
  width?: number;
  height?: number;
  fit?: 'cover' | 'contain' | 'fill';
}

export function Thumbnail({
  src,
  width = 186,
  height = 130,
  fit = 'cover'
}: ThumbnailProps) {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setThumbnail(null);

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          setError(true);
          setLoading(false);
          return;
        }

        // Limpa o canvas com cor de fundo
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, width, height);

        const imgAspect = img.width / img.height;
        const canvasAspect = width / height;

        let drawWidth, drawHeight, drawX, drawY;

        if (fit === 'cover') {
          // Preenche todo o canvas, cortando se necessário
          if (imgAspect > canvasAspect) {
            // Imagem mais larga - ajusta pela altura
            drawHeight = height;
            drawWidth = height * imgAspect;
            drawX = (width - drawWidth) / 2;
            drawY = 0;
          } else {
            // Imagem mais alta - ajusta pela largura
            drawWidth = width;
            drawHeight = width / imgAspect;
            drawX = 0;
            drawY = (height - drawHeight) / 2;
          }
        } else if (fit === 'contain') {
          // Mantém toda a imagem visível dentro do canvas
          if (imgAspect > canvasAspect) {
            // Imagem mais larga - ajusta pela largura
            drawWidth = width;
            drawHeight = width / imgAspect;
            drawX = 0;
            drawY = (height - drawHeight) / 2;
          } else {
            // Imagem mais alta - ajusta pela altura
            drawHeight = height;
            drawWidth = height * imgAspect;
            drawX = (width - drawWidth) / 2;
            drawY = 0;
          }
        } else {
          // fill - estica para preencher (pode distorcer)
          drawWidth = width;
          drawHeight = height;
          drawX = 0;
          drawY = 0;
        }

        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
        setThumbnail(thumbnailUrl);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao processar imagem:', err);
        setError(true);
        setLoading(false);
      }
    };

    img.onerror = () => {
      setError(true);
      setLoading(false);
    };

    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, width, height, fit]);

  if (error) {
    return (
      <div
        className="flex items-center justify-center text-xs text-gray-500 bg-gray-100 border border-gray-200 rounded"
        style={{ width, height }}
      >
        Erro ao carregar
      </div>
    );
  }

  if (loading || !thumbnail) {
    return (
      <div
        className="flex items-center justify-center text-xs text-gray-500 bg-gray-100 border border-gray-200 rounded animate-pulse"
        style={{ width, height }}
      >
        Carregando...
      </div>
    );
  }

  return (
    <img
      src={thumbnail}
      alt="Miniatura"
      width={width}
      height={height}
      className="rounded border border-gray-200 object-cover"
      style={{ width, height }}
    />
  );
}
