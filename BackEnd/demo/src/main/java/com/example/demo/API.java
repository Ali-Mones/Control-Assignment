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

    // @PostMapping("/signalflow")
    // public void DoMason(@RequestParam String graph) {
    //     Gson gson = new Gson();
    //     Pair[][] pairs = gson.fromJson(graph, Pair[][].class);

    //     List<List<Pair>> list = new ArrayList<>();

    //     for (var l : pairs) {
    //         list.add(List.of(l));
    //     }

    //     SFGSolver solver = new SFGSolver(list);
    // }
}
