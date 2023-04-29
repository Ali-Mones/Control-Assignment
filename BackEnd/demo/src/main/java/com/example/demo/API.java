package com.example.demo;

import Graph.RouthSolver;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class API {

    @GetMapping("/rouths")
    public int DoRouths(@RequestParam String Equation){
        String[] terms = RouthSolver.splitEquations(Equation);
        int[] Coefficients = RouthSolver.cofficientsExtractor(terms);

        return RouthSolver.getPolesCount(Coefficients);
    }
}
