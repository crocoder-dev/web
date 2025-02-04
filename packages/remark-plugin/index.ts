import type { Node } from 'unist';
import { visit } from 'unist-util-visit';


function remark({
  titleClass,
  detailsClass,
  summaryClass,
  iframeClass
}: {
  titleClass: string,
  detailsClass: string,
  summaryClass: string,
  iframeClass: string,
}) {
  return () => {

    return (tree: Node) => {
      let contentsHtml = '';
      let lastNodeDepth = 100;
      let ulDepth = 0;
      let startingUlDepth = 0;
      let contentsHeadingParent = null;
      let contentsHeadingIndex = 0;

      visit(tree, 'heading', (node: any, index: number, parent: any) => {
        if (!node.children || node.children.length !== 1) return;
        const textNode = node.children[0];

        if (textNode.type === 'text' && textNode.value === 'Contents') {
          contentsHeadingParent = parent;
          contentsHeadingIndex = index;
          return;
        }

        const id = textNode.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-_\.]/g, '');
        node.id = id;

        if (contentsHtml.length === 0) {
          contentsHtml += '<ul>';
          ulDepth = node.depth;
          startingUlDepth = node.depth;
          lastNodeDepth = node.depth;
        }

        if (node.depth === lastNodeDepth) {
          contentsHtml += '<li>';
          contentsHtml += `<a href="#${id}">${textNode.value}</a>`;
          contentsHtml += '</li>';
        }

        if (node.depth > lastNodeDepth) {
          contentsHtml += '<ul>'.repeat(node.depth - lastNodeDepth);
          contentsHtml += '<li>';
          contentsHtml += `<a href="#${id}">${textNode.value}</a>`;
          contentsHtml += '</li>';
          lastNodeDepth = node.depth;
        }

        if (node.depth < lastNodeDepth) {
          contentsHtml += '<li>';
          contentsHtml += `<a href="#${id}">${textNode.value}</a>`;
          contentsHtml += '</li>';
          contentsHtml += '</ul>'.repeat(lastNodeDepth - node.depth);
          lastNodeDepth = node.depth;
        }
      });

      if (contentsHtml.length !== 0) {
        contentsHtml += '</ul>'.repeat(ulDepth - startingUlDepth + 1);
      }

      if (contentsHeadingParent !== null) {
        (contentsHeadingParent as any).children.splice(contentsHeadingIndex + 1, 0, {
          type: 'html',
          value: contentsHtml,
        });
      }

      visit(tree, 'paragraph', (node: any, index: number, parent: any) => {
        if (!node.children || node.children.length !== 1) return;
        const textNode = node.children[0];

        // non h title rule
        if (textNode.type === 'text' && textNode.value.startsWith('::title ')) {
          const titleText = textNode.value.substring('::title '.length);
          const titleNode = {
            type: 'html',
            value: `<p class="${titleClass}">${titleText}</p>`
          };
          parent.children.splice(index, 1, titleNode);
        }

        if (textNode.type === 'text' && textNode.value.startsWith('::details ')) {
          const summaryText = textNode.value.substring('::details '.length);
          const node = {
            type: 'html',
            value: `<details class="${detailsClass}"><summary class="${summaryClass}">${summaryText}</summary>`
          };
          parent.children.splice(index, 1, node);
        }

        if (textNode.type === 'text' && textNode.value.startsWith('::enddetails')) {
          const node = {
            type: 'html',
            value: `</details>`
          };
          parent.children.splice(index, 1, node);
        }
        
        if (textNode.type === 'text' && textNode.value.startsWith('::iframe ')) {
          const iframeSrc = textNode.value.substring('::iframe '.length);
          const iframeNode = {
            type: 'html',
            value: `<iframe height="360" src="${iframeSrc}" class="${iframeClass}"></iframe>`
          };
          parent.children.splice(index, 1, iframeNode);
        }
      });

      visit(tree, 'link', (node: any) => {
        const isExternal = /^https?:\/\//i.test(node.url) || /^\/\//.test(node.url);

        if (!isExternal) return;

        if (!node.data) {
          node.data = {};
        }

        if (!node.data.hProperties) {
          node.data.hProperties = {};
        }

        node.data.hProperties.target = '_blank';
        node.data.hProperties.rel = 'noopener noreferrer';
      });
    };
  };
}

export default remark;
