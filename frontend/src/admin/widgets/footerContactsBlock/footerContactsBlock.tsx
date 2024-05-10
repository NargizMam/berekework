import React from 'react';
import { IContactsBlock } from '../../../shared/types';

interface FooterContactsBlock {
  contactBlock: IContactsBlock[];
}

const FooterContactsBlock: React.FC<FooterContactsBlock> = ({contactBlock}) => {
  return (
    <div className="footerLinksBlocks">
      {contactBlock.map((block, index) => (
        <div className="footerLinksBlock" key={index}>
          <h1>{block.title}</h1>
          <ul className="links-list">
            {block.contactsDetailsArr.map((link, linkIndex) => (
              <li key={linkIndex}>{link.text}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FooterContactsBlock;