import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;

  .frame {
    position: relative;
    border: 1px solid var(--border);
    overflow: hidden;
    background-color: var(--surface);
  }

  .aspect {
    position: relative;
    width: 100%;
    padding-top: 62.5%; /* 16:10, matches Loom's default recording frame */

    iframe {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }
  }
`;

const toEmbedUrl = shareUrl => {
  try {
    const url = new URL(shareUrl);
    if (!url.hostname.includes('loom.com')) {
      return null;
    }
    const id = url.pathname.split('/').filter(Boolean).pop();
    return id ? `https://www.loom.com/embed/${id}` : null;
  } catch (err) {
    return null;
  }
};

const LoomEmbed = ({ url, title }) => {
  const embedUrl = toEmbedUrl(url);

  if (!embedUrl) {
    return null;
  }

  return (
    <StyledWrapper>
      <div className="frame">
        <div className="aspect">
          <iframe
            src={embedUrl}
            title={title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </StyledWrapper>
  );
};

LoomEmbed.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
};

LoomEmbed.defaultProps = {
  url: '',
  title: 'Video introduction',
};

export default LoomEmbed;
