import type { Node } from 'unist';
import { visit } from 'unist-util-visit';

function remark({
  titleClass,
  detailsClass,
  summaryClass,
}: {
  titleClass: string,
  detailsClass: string,
  summaryClass: string
}) {
  return () => {
    return (tree: Node) => {
      visit(tree, 'paragraph', (node: any, index: number, parent: any) => {
        if (!node.children || node.children.length !== 1) return;
        const textNode = node.children[0];

        // non h title rule
        if (textNode.type === 'text' && textNode.value.startsWith('^ ')) {
          const titleText = textNode.value.slice(2, -1);
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

      });
    };
  };
}

export default remark;
