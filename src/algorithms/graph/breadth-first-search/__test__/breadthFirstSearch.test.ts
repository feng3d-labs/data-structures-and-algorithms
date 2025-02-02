import { deepEqual } from 'assert';
import { Graph } from '../../../../data-structures/graph/Graph';
import { GraphEdge } from '../../../../data-structures/graph/GraphEdge';
import { GraphVertex } from '../../../../data-structures/graph/GraphVertex';
import { breadthFirstSearch } from '../breadthFirstSearch';

describe('breadthFirstSearch', () =>
{
    it('should perform BFS operation on graph', () =>
    {
        const graph = new Graph<string>(true);

        const vertexA = new GraphVertex('A');
        const vertexB = new GraphVertex('B');
        const vertexC = new GraphVertex('C');
        const vertexD = new GraphVertex('D');
        const vertexE = new GraphVertex('E');
        const vertexF = new GraphVertex('F');
        const vertexG = new GraphVertex('G');
        const vertexH = new GraphVertex('H');

        const edgeAB = new GraphEdge(vertexA, vertexB);
        const edgeBC = new GraphEdge(vertexB, vertexC);
        const edgeCG = new GraphEdge(vertexC, vertexG);
        const edgeAD = new GraphEdge(vertexA, vertexD);
        const edgeAE = new GraphEdge(vertexA, vertexE);
        const edgeEF = new GraphEdge(vertexE, vertexF);
        const edgeFD = new GraphEdge(vertexF, vertexD);
        const edgeDH = new GraphEdge(vertexD, vertexH);
        const edgeGH = new GraphEdge(vertexG, vertexH);

        graph
            .addEdge(edgeAB)
            .addEdge(edgeBC)
            .addEdge(edgeCG)
            .addEdge(edgeAD)
            .addEdge(edgeAE)
            .addEdge(edgeEF)
            .addEdge(edgeFD)
            .addEdge(edgeDH)
            .addEdge(edgeGH);

        deepEqual(graph.toString(), 'A,B,C,G,D,E,F,H');

        // eslint-disable-next-line func-style

        let enterVertexCallbackTimes = 0;
        const enterVertexCallbackCalls = [];
        const enterVertexCallback = (...args: any) => { enterVertexCallbackTimes++; enterVertexCallbackCalls.push(args); };

        let leaveVertexCallbackTimes = 0;
        const leaveVertexCallbackCalls = [];
        const leaveVertexCallback = (...args: any) => { leaveVertexCallbackTimes++; leaveVertexCallbackCalls.push(args); };

        // Traverse graphs without callbacks first.
        breadthFirstSearch(graph, vertexA);

        // Traverse graph with enterVertex and leaveVertex callbacks.
        breadthFirstSearch(graph, vertexA, {
            enterVertex: enterVertexCallback,
            leaveVertex: leaveVertexCallback,
        });

        deepEqual(enterVertexCallbackTimes, 8);
        deepEqual(leaveVertexCallbackTimes, 8);

        const enterVertexParamsMap = [
            { currentVertex: vertexA, previousVertex: null },
            { currentVertex: vertexB, previousVertex: vertexA },
            { currentVertex: vertexD, previousVertex: vertexB },
            { currentVertex: vertexE, previousVertex: vertexD },
            { currentVertex: vertexC, previousVertex: vertexE },
            { currentVertex: vertexH, previousVertex: vertexC },
            { currentVertex: vertexF, previousVertex: vertexH },
            { currentVertex: vertexG, previousVertex: vertexF },
        ];

        for (let callIndex = 0; callIndex < graph.getAllVertices().length; callIndex += 1)
        {
            const params = enterVertexCallbackCalls[callIndex][0];
            deepEqual(params.currentVertex, enterVertexParamsMap[callIndex].currentVertex);
            deepEqual(params.previousVertex, enterVertexParamsMap[callIndex].previousVertex);
        }

        const leaveVertexParamsMap = [
            { currentVertex: vertexA, previousVertex: null },
            { currentVertex: vertexB, previousVertex: vertexA },
            { currentVertex: vertexD, previousVertex: vertexB },
            { currentVertex: vertexE, previousVertex: vertexD },
            { currentVertex: vertexC, previousVertex: vertexE },
            { currentVertex: vertexH, previousVertex: vertexC },
            { currentVertex: vertexF, previousVertex: vertexH },
            { currentVertex: vertexG, previousVertex: vertexF },
        ];

        for (let callIndex = 0; callIndex < graph.getAllVertices().length; callIndex += 1)
        {
            const params = leaveVertexCallbackCalls[callIndex][0];
            deepEqual(params.currentVertex, leaveVertexParamsMap[callIndex].currentVertex);
            deepEqual(params.previousVertex, leaveVertexParamsMap[callIndex].previousVertex);
        }
    });

    it('should allow to create custom vertex visiting logic', () =>
    {
        const graph = new Graph(true);

        const vertexA = new GraphVertex('A');
        const vertexB = new GraphVertex('B');
        const vertexC = new GraphVertex('C');
        const vertexD = new GraphVertex('D');
        const vertexE = new GraphVertex('E');
        const vertexF = new GraphVertex('F');
        const vertexG = new GraphVertex('G');
        const vertexH = new GraphVertex('H');

        const edgeAB = new GraphEdge(vertexA, vertexB);
        const edgeBC = new GraphEdge(vertexB, vertexC);
        const edgeCG = new GraphEdge(vertexC, vertexG);
        const edgeAD = new GraphEdge(vertexA, vertexD);
        const edgeAE = new GraphEdge(vertexA, vertexE);
        const edgeEF = new GraphEdge(vertexE, vertexF);
        const edgeFD = new GraphEdge(vertexF, vertexD);
        const edgeDH = new GraphEdge(vertexD, vertexH);
        const edgeGH = new GraphEdge(vertexG, vertexH);

        graph
            .addEdge(edgeAB)
            .addEdge(edgeBC)
            .addEdge(edgeCG)
            .addEdge(edgeAD)
            .addEdge(edgeAE)
            .addEdge(edgeEF)
            .addEdge(edgeFD)
            .addEdge(edgeDH)
            .addEdge(edgeGH);

        deepEqual(graph.toString(), 'A,B,C,G,D,E,F,H');

        let enterVertexCallbackTimes = 0;
        const enterVertexCallbackCalls = [];
        const enterVertexCallback = (...args: any) => { enterVertexCallbackTimes++; enterVertexCallbackCalls.push(args); };

        let leaveVertexCallbackTimes = 0;
        const leaveVertexCallbackCalls = [];
        const leaveVertexCallback = (...args: any) => { leaveVertexCallbackTimes++; leaveVertexCallbackCalls.push(args); };

        // Traverse graph with enterVertex and leaveVertex callbacks.
        breadthFirstSearch(graph, vertexA, {
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
            { currentVertex: vertexE, previousVertex: vertexD },
            { currentVertex: vertexH, previousVertex: vertexE },
            { currentVertex: vertexF, previousVertex: vertexH },
            { currentVertex: vertexD, previousVertex: vertexF },
            { currentVertex: vertexH, previousVertex: vertexD },
        ];

        for (let callIndex = 0; callIndex < 7; callIndex += 1)
        {
            const params = enterVertexCallbackCalls[callIndex][0];
            deepEqual(params.currentVertex, enterVertexParamsMap[callIndex].currentVertex);
            deepEqual(params.previousVertex, enterVertexParamsMap[callIndex].previousVertex);
        }

        const leaveVertexParamsMap = [
            { currentVertex: vertexA, previousVertex: null },
            { currentVertex: vertexD, previousVertex: vertexA },
            { currentVertex: vertexE, previousVertex: vertexD },
            { currentVertex: vertexH, previousVertex: vertexE },
            { currentVertex: vertexF, previousVertex: vertexH },
            { currentVertex: vertexD, previousVertex: vertexF },
            { currentVertex: vertexH, previousVertex: vertexD },
        ];

        for (let callIndex = 0; callIndex < 7; callIndex += 1)
        {
            const params = leaveVertexCallbackCalls[callIndex][0];
            deepEqual(params.currentVertex, leaveVertexParamsMap[callIndex].currentVertex);
            deepEqual(params.previousVertex, leaveVertexParamsMap[callIndex].previousVertex);
        }
    });
});
