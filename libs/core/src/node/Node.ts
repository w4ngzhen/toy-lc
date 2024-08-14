export type NodeId = string | '_root_';

export interface Node {
    id: NodeId;
    parent?: NodeId;
    children?: NodeId[];
}