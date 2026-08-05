import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/*
 * The recurring "statement field" pattern — a mono label over/beside an ink
 * value, rows divided by hairlines. Used in the Hero letterhead, About's
 * background fields, and case-study meta. One structural device instead of
 * a different card style per section.
 */
export const LedgerFields = styled.div`
  border-bottom: 1px solid var(--border);
`;

const StyledRow = styled.div`
  display: grid;
  grid-template-columns: ${({ $labelWidth }) => $labelWidth || '168px'} 1fr;
  gap: 16px;
  padding: 13px 0;
  border-top: 1px solid var(--border-soft);
  font-size: var(--fz-sm);

  &:first-child {
    border-top: none;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 2px;
  }
`;

const Label = styled.span`
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Value = styled.span`
  color: var(--heading);
  font-weight: 500;

  &.status {
    display: inline-flex;
    align-items: center;
    gap: 9px;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--stamp);
    flex-shrink: 0;
  }
`;

export const FieldRow = ({ label, value, status, labelWidth }) => (
  <StyledRow $labelWidth={labelWidth}>
    <Label>{label}</Label>
    <Value className={status ? 'status' : undefined}>
      {status && <span className="dot" aria-hidden="true" />}
      {value}
    </Value>
  </StyledRow>
);

FieldRow.propTypes = {
  label: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  status: PropTypes.bool,
  labelWidth: PropTypes.string,
};
