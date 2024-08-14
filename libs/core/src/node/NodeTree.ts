import { NodeId, Node } from "./Node";
import { LcErr } from "../err";
import { randomStr } from "../utils/random";

export class NodeTree {
  private readonly nodes: Record<NodeId, Node> = {};

  constructor() {
    this.nodes["_root_"] = {
      id: "_root_",
    };
  }

  generateChildNode(parentNodeId: NodeId, index?: number): NodeId {
    const parentNode = this._findNode(parentNodeId);
    parentNode.children = parentNode.children || [];
    const childrenLen = parentNode.children.length;
    let _idx: number;
    if (!index || index >= childrenLen) {
      _idx = childrenLen;
    } else if (index < 0) {
      _idx = 0;
    } else {
      _idx = index;
    }
    const childNode: Node = {
      id: this._genNodeId(),
      parent: parentNodeId,
    };
    this.nodes[childNode.id] = childNode;
    parentNode.children.splice(_idx, 0, childNode.id);
    return childNode.id;
  }

  deleteNode(nodeId: NodeId) {
    const targetNode = this._findNode(nodeId);
    const parentId = targetNode.parent;
    if (parentId) {
      const parentNode = this.nodes[parentId];
      // use "??", undefined or null -> -1, 0 -> 0
      const childIdx = parentNode.children?.indexOf(nodeId) ?? -1;
      if (childIdx >= 0) {
        parentNode.children?.splice(childIdx, 1);
      }
    }
    delete this.nodes[nodeId];
  }

  /**
   * move the node to the position after the targetNode
   * @param srcNodeId
   * @param destNodeId
   * @param afterPosition
   */
  moveNode(srcNodeId: NodeId, destNodeId: NodeId, afterPosition: boolean) {
    const srcNode = this._findNode(srcNodeId);
    const destNode = this._findNode(destNodeId);

    // same parent
    if (srcNode.parent === destNode.parent) {
      const parentNode = this._findNode(srcNode.parent);
      const srcIdx = parentNode.children.indexOf(srcNodeId);
      // you should delete src node first.
      parentNode.children.splice(srcIdx, 1);
      // now destIdx is no longer same as before
      const destIdx = parentNode.children.indexOf(destNodeId);
      parentNode.children.splice(
        destIdx + (afterPosition ? 1 : 0),
        0,
        srcNodeId,
      );
      return;
    }

    // otherwise, different parent.
    const srcNodeParentNode = this._findNode(srcNode.parent);
    const destNodeParentNode = this._findNode(destNode.parent);
    srcNodeParentNode.children.splice(
      srcNodeParentNode.children.indexOf(srcNodeId),
      1,
    );
    destNodeParentNode.children.splice(
      destNodeParentNode.children.indexOf(destNodeId) + (afterPosition ? 1 : 0),
      0,
      srcNodeId,
    );
  }

  toString() {
    return JSON.stringify(this.nodes, undefined, 2);
  }

  private _findNode(id: NodeId, strict = true): Node {
    const target = this.nodes[id];
    if (!target && strict) {
      throw new LcErr(`cannot found target node which id = ${id}`);
    }
    return target;
  }

  private _genNodeId(): NodeId {
    let nodeId: NodeId;
    let count = 3;
    while (count > 0) {
      nodeId = randomStr();
      if (!this.nodes[nodeId]) {
        return nodeId;
      }
      count--;
    }
    throw new LcErr("cannot generate a node id");
  }
}
