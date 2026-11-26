import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { lookupRegionalVisit, type RegionalVisit } from '../regional-visit';
import './RegionalVisitNotice.css';

const RegionalVisitNotice = () => {
  const [visit, setVisit] = useState<RegionalVisit | null>(null);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 5000);
    let active = true;
    const load = async () => {
      try {
        const result = await lookupRegionalVisit(window.sessionStorage, controller.signal);
        if (active && result) setVisit(result);
      } catch {
        // Storage may be unavailable in restricted browser contexts.
      } finally {
        window.clearTimeout(timeout);
      }
    };
    void load();
    return () => {
      active = false;
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!visit) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) {
      setShowAnimation(false);
      return;
    }
    const timeout = window.setTimeout(() => setShowAnimation(false), 3000);
    return () => window.clearTimeout(timeout);
  }, [visit]);

  if (!visit) return null;

  return (
    <aside id="regional-visit-notice" lang="pt-BR" aria-labelledby="regional-visit-title">
      <div className="regional-visit-body">
        <div className="regional-visit-header">
          <h2 id="regional-visit-title">Sua conexão, neste navegador</h2>
          <button type="button" className="regional-visit-close" aria-label="Fechar aviso" onClick={() => setVisit(null)}>
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        {showAnimation && (
          <div className="regional-visit-animation" aria-hidden="true">
            <span className="regional-visit-dot" />
            <span>Exibição local dos dados</span>
            <span className="regional-visit-track"><span /></span>
          </div>
        )}
        <p>Este é o IP público da sua conexão e a localização aproximada associada a ele. A localização pode variar se você usa VPN ou uma rede compartilhada.</p>
        <p>Este aviso exibe os dados apenas neste navegador, sem armazená-los nem enviá-los ao proprietário do portfólio.</p>
        <p className="regional-visit-provider">A consulta é feita diretamente à <a href="https://freeipapi.com/privacy" target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer">FreeIPAPI</a>, que processa seu IP para responder.</p>
      </div>
      <div className="regional-visit-footer">
        <span className="regional-visit-location">{visit.location}</span>
        <span className="regional-visit-ip" aria-label={`IP público: ${visit.ip}`}>{visit.ip}</span>
      </div>
    </aside>
  );
};

export default RegionalVisitNotice;
