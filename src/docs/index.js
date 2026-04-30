import basicInfo from './basicInfo.js';
import servers from './servers.js';
import tags from './tags.js';
import components from './components.js';
import paths from './paths/index.js';

const docs = {
  ...basicInfo,
  ...servers,
  ...tags,
  ...components,
  ...paths,
};

export default docs;
