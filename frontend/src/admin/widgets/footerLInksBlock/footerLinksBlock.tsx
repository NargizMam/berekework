import React from 'react';
import { IFooterLinks } from '../../../shared/types';
import './footerLInksBlock.css';

interface FooterLinksBlockProps {
  footerBlocks: IFooterLinks[];
}

const FooterLinksBlock: React.FC<FooterLinksBlockProps> = ({ footerBlocks }) => {

  console.log(footerBlocks);

  return (
    <div className="footerLinksBlocks">
      {footerBlocks.map((block, index) => (
        <div className="footerLinksBlock" key={index}>
          <h1>{block.title}</h1>
          <ul className="links-list">
            {block.links.map((link, linkIndex) => (
              <li key={linkIndex}>
                <a href={link.url}>{link.text}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FooterLinksBlock;
