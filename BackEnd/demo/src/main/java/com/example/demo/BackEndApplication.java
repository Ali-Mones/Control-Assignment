package com.example.demo;

import Graph.Pair;
import Graph.SFGSolver;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@SpringBootApplication
public class BackEndApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackEndApplication.class, args);

		List <List<Pair>> adj = new ArrayList<>();
		for (int i = 0 ; i < 7 ; i++) adj.add(new ArrayList<>());
		adj.get(1).add(new Pair(2 , 1));
		adj.get(2).add(new Pair(3 , 2));
		adj.get(3).add(new Pair(4 , 3));
		adj.get(4).add(new Pair(5 , 4));
		adj.get(5).add(new Pair(6 , 5));
		adj.get(2).add(new Pair(1 , 2));
		adj.get(4).add(new Pair(3 , 2));
		adj.get(6).add(new Pair(5 , 2));

		SFGSolver solver = new SFGSolver(adj);
		System.out.println(solver.getNumerator() + " / " + solver.getDelta());
//		System.out.println(solver.getDelta());
		var paths = solver.getLoops();
		var gains = solver.getLoopGains();

//		HashMap< Integer , Integer > map = new HashMap<>();
//		for (var i : paths.get(0)){
//			if(map.containsKey(i)){
//				map.put(i , map.get(i) + 1);
//			}else{
//				map.put(i , 1);
//			}
//		}
//
//		for (var keyValue : map.entrySet()){
//			System.out.println(keyValue.getKey() + " " + keyValue.getValue());
//		}

//		for(int i=0;i<paths.size();i++){
//			System.out.print("Path "+ i +": ");
//			for(int j=0;j<paths.get(i).size();j++){
//				System.out.print(paths.get(i).get(j)+" ");
//			}
//			System.out.println();
//			System.out.println("Gain: " + gains.get(i));
//		}
	}

}
