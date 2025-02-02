import { deepEqual } from 'assert';
import { Graph } from '../../../../data-structures/graph/Graph';
import { GraphEdge } from '../../../../data-structures/graph/GraphEdge';
import { GraphVertex } from '../../../../data-structures/graph/GraphVertex';
import { depthFirstSearch } from '../depthFirstSearch';

describe('depthFirstSearch', () =>
{
    it('should perform DFS operation on graph', () =>
    {
        const graph = new Graph<string>(true);

        const vertexA = new GraphVertex('A');
        const vertexB = new GraphVertex('B');
        const vertexC = new GraphVertex('C');
        const vertexD = new GraphVertex('D');
        const vertexE = new GraphVertex('E');
        const vertexF = new GraphVertex('F');
        const vertexG = new GraphVertex('G');

        const edgeAB = new GraphEdge(vertexA, vertexB);
        const edgeBC = new GraphEdge(vertexB, vertexC);
        const edgeCG = new GraphEdge(vertexC, vertexG);
        const edgeAD = new GraphEdge(vertexA, vertexD);
        const edgeAE = new GraphEdge(vertexA, vertexE);
        const edgeEF = new GraphEdge(vertexE, vertexF);
        const edgeFD = new GraphEdge(vertexF, vertexD);
        const edgeDG = new GraphEdge(vertexD, vertexG);

        graph
            .addEdge(edgeAB)
            .addEdge(edgeBC)
            .addEdge(edgeCG)
            .addEdge(edgeAD)
            .addEdge(edgeAE)
            .addEdge(edgeEF)
            .addEdge(edgeFD)
            .addEdge(edgeDG);

        deepEqual(graph.toString(), 'A,B,C,G,D,E,F');

        let enterVertexCallbackTimes = 0;
        const enterVertexCallbackCalls = [];
        const enterVertexCallback = (...args: any) => { enterVertexCallbackTimes++; enterVertexCallbackCalls.push(args); };

        let leaveVertexCallbackTimes = 0;
        const leaveVertexCallbackCalls = [];
        const leaveVertexCallback = (...args: any) => { leaveVertexCallbackTimes++; leaveVertexCallbackCalls.push(args); };

        // Traverse graphs without callbacks first to check default ones.
        depthFirstSearch(graph, vertexA);

        // Traverse graph with enterVertex and leaveVertex callbacks.
        depthFirstSearch(graph, vertexA, {
            enterVertex: enterVertexCallback,
            leaveVertex: leaveVertexCallback,
        });

        deepEqual(enterVertexCallbackTimes, graph.getAllVertices().length);
        deepEqual(leaveVertexCallbackTimes, graph.getAllVertices().length);

        const enterVertexParamsMap = [
            { currentVertex: vertexA, previousVertex: null },
            { currentVertex: vertexB, previousVertex: vertexA },
            { currentVertex: vertexC, previousVertex: vertexB },
            { currentVertex: vertexG, previousVertex: vertexC },
            { currentVertex: vertexD, previousVertex: vertexA },
            { currentVertex: vertexE, previousVertex: vertexA },
            { currentVertex: vertexF, previousVertex: vertexE },
        ];

        for (let callIndex = 0; callIndex < graph.getAllVertices().length; callIndex += 1)
        {
            const params = enterVertexCallbackCalls[callIndex][0];
            deepEqual(params.currentVertex, enterVertexParamsMap[callIndex].currentVertex);
            deepEqual(params.previousVertex, enterVertexParamsMap[callIndex].previousVertex);
        }

        const leaveVertexParamsMap = [
            { currentVertex: vertexG, previousVertex: vertexC },
            { currentVertex: vertexC, previousVertex: vertexB },
            { currentVertex: vertexB, previousVertex: vertexA },
            { currentVertex: vertexD, previousVertex: vertexA },
            { currentVertex: vertexF, previousVertex: vertexE },
            { currentVertex: vertexE, previousVertex: vertexA },
            { currentVertex: vertexA, previousVertex: null },
        ];

        for (let callIndex = 0; callIndex < graph.getAllVertices().length; callIndex += 1)
        {
            const params = leaveVertexCallbackCalls[callIndex][0];
            deepEqual(params.currentVertex, leaveVertexParamsMap[callIndex].currentVertex);
            deepEqual(params.previousVertex, leaveVertexParamsMap[callIndex].previousVertex);
        }
    });

    it('allow users to redefine vertex visiting logic', () =>
    {
        const graph = new Graph(true);

        const vertexA = new GraphVertex('A');
        const vertexB = new GraphVertex('B');
        const vertexC = new GraphVertex('C');
        const vertexD = new GraphVertex('D');
        const vertexE = new GraphVertex('E');
        const vertexF = new GraphVertex('F');
        const vertexG = new GraphVertex('G');

        const edgeAB = new GraphEdge(vertexA, vertexB);
        const edgeBC = new GraphEdge(vertexB, vertexC);
        const edgeCG = new GraphEdge(vertexC, vertexG);
        const edgeAD = new GraphEdge(vertexA, vertexD);
        const edgeAE = new GraphEdge(vertexA, vertexE);
        const edgeEF = new GraphEdge(vertexE, vertexF);
        const edgeFD = new GraphEdge(vertexF, vertexD);
        const edgeDG = new GraphEdge(vertexD, vertexG);

        graph
            .addEdge(edgeAB)
            .addEdge(edgeBC)
            .addEdge(edgeCG)
            .addEdge(edgeAD)
            .addEdge(edgeAE)
            .addEdge(edgeEF)
            .addEdge(edgeFD)
            .addEdge(edgeDG);

        deepEqual(graph.toString(), 'A,B,C,G,D,E,F');

        let enterVertexCallbackTimes = 0;
        const enterVertexCallbackCalls = [];
        const enterVertexCallback = (...args: any) => { enterVertexCallbackTimes++; enterVertexCallbackCalls.push(args); };

        let leaveVertexCallbackTimes = 0;
        const leaveVertexCallbackCalls = [];
        const leaveVertexCallback = (...args: any) => { leaveVertexCallbackTimes++; leaveVertexCallbackCalls.push(args); };

        depthFirstSearch(graph, vertexA, {
            enterVertex: enterVertexCallback,
            leaveVertex: leaveVertexCallback,
            allowTraversal: ({ currentVertex, nextVertex }) =>
                !(currentVertex === vertexA && nextVertex === vertexB),
        });

        deepEqual(enterVertexCallbackTimes, 7);
        deepEqual(leaveVertexCallbackTimes, 7);

        const enterVertexParamsMap = [
            { currentVertex: vertexA, previousVertex: null },
            { currentVertex: vertexD, previousVertex: vertexA },
            { currentVertex: vertexG, previousVertex: vertexD },
            { currentVertex: vertexE, previousVertex: vertexA },
            { currentVertex: vertexF, previousVertex: vertexE },
            { currentVertex: vertexD, previousVertex: vertexF },
            { currentVertex: vertexG, previousVertex: vertexD },
        ];

        for (let callIndex = 0; callIndex < graph.getAllVertices().length; callIndex += 1)
        {
            const params = enterVertexCallbackCalls[callIndex][0];
            deepEqual(params.currentVertex, enterVertexParamsMap[callIndex].currentVertex);
            deepEqual(params.previousVertex, enterVertexParamsMap[callIndex].previousVertex);
        }

        const leaveVertexParamsMap = [
            { currentVertex: vertexG, previousVertex: vertexD },
            { currentVertex: vertexD, previousVertex: vertexA },
            { currentVertex: vertexG, previousVertex: vertexD },
            { currentVertex: vertexD, previousVertex: vertexF },
            { currentVertex: vertexF, previousVertex: vertexE },
            { currentVertex: vertexE, previousVertex: vertexA },
            { currentVertex: vertexA, previousVertex: null },
        ];

        for (let callIndex = 0; callIndex < graph.getAllVertices().length; callIndex += 1)
        {
            const params = leaveVertexCallbackCalls[callIndex][0];
            deepEqual(params.currentVertex, leaveVertexParamsMap[callIndex].currentVertex);
            deepEqual(params.previousVertex, leaveVertexParamsMap[callIndex].previousVertex);
        }
    });
});
