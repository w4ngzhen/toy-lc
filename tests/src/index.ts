import { NodeTree } from "@toy-lc/core";

const nodeTree = new NodeTree();

const node_1 = nodeTree.generateChildNode("_root_");
const node_1_1 = nodeTree.generateChildNode(node_1);
const node_1_2 = nodeTree.generateChildNode(node_1);

const node_2 = nodeTree.generateChildNode("_root_");
nodeTree.generateChildNode(node_2);

const node_3 = nodeTree.generateChildNode("_root_");
nodeTree.generateChildNode(node_3);

console.log(nodeTree.toString());
