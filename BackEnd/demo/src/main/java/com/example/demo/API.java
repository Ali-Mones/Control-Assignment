package com.example.demo;

import Graph.Pair;
import Graph.RouthSolver;
import Graph.SFGSolver;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

@RestController
@CrossOrigin
public class API {

    @PostMapping("/rouths")
    public int DoRouths(@RequestParam String Equation){
        String[] terms = RouthSolver.splitEquations(Equation);
        int[] Coefficients = RouthSolver.cofficientsExtractor(terms);

        return RouthSolver.getPolesCount(Coefficients);
    }

    @PostMapping("/signalflow")
    public ArrayList < ArrayList < String > > DoMason(@RequestParam String graph) {
        Gson gson = new Gson();
        Pair[][] pairs = gson.fromJson(graph, Pair[][].class);

        List<List<Pair>> adj = new ArrayList<>();
        adj.add(new ArrayList<>());

        for (var l : pairs) {
            adj.add(List.of(l));
        }

        SFGSolver solver = new SFGSolver(adj);
        var fPaths = solver.getForwardPaths();
        var fPathsGains = solver.getForwardPathsGains();
        var loops = solver.getLoops();
        var loopsGains = solver.getLoopGains();
        var num = solver.getNumerator();
        var delta = solver.getDelta();
        var sol = solver.getResult();
        ArrayList < ArrayList< String >> arrayList = new ArrayList<>();
        StringBuilder stringBuilder = new StringBuilder();
        // stringBuilder.append("Forward Paths:\n");
        ArrayList< String > forwardPaths = new ArrayList<>();
        for (int i = 0 ; i < fPaths.size() ; i++){
            stringBuilder = new StringBuilder();
            stringBuilder.append("Path #").append(i + 1).append(": ");
            getString(fPaths, fPathsGains, stringBuilder, i);
            forwardPaths.add(stringBuilder.toString());
        }
        arrayList.add(forwardPaths);
        // stringBuilder.append("Loops:\n");
        ArrayList< String > loopsArray = new ArrayList<>();
        for (int i = 0 ; i < loops.size() ; i++){
            stringBuilder = new StringBuilder();
            stringBuilder.append("Loop #").append(i + 1).append(": ");
            getString(loops, loopsGains, stringBuilder, i);
            loopsArray.add(stringBuilder.toString());
        }
        arrayList.add(loopsArray);
        stringBuilder = new StringBuilder();
        // stringBuilder.append("Result:\n");
        ArrayList< String > deltaArray = new ArrayList<>();
        stringBuilder.append("Y(s) / R(s) = ").append(num).append(" / ").append(delta).append(" = ").append(sol);
        deltaArray.add(stringBuilder.toString());
        arrayList.add(deltaArray);

        stringBuilder = new StringBuilder();
        ArrayList< String > deltasArray = new ArrayList<>();
        return arrayList;
    }

    private static void getString(List<List<Integer>> lists, List<Integer> list, StringBuilder stringBuilder, int i) {
        for (int j = 0 ; j < lists.get(i).size() ; j++){
            var x = lists.get(i).get(j);
            stringBuilder.append(x);
            if(j != lists.get(i).size() - 1) stringBuilder.append(" -> ");
        }
        stringBuilder.append("-Gain #").append(i + 1).append(": ").append(list.get(i));
        // if(i != lists.size() - 1) stringBuilder.append("\n\n");
    }
}
