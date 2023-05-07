package com.example.demo;

import Graph.Pair;
import Graph.RouthSolver;
import Graph.SFGSolver;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@SpringBootApplication
public class BackEndApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackEndApplication.class, args);

//		List <List<Pair>> adj = new ArrayList<>();
//		for (int i = 0 ; i < 7 ; i++) adj.add(new ArrayList<>());
//		adj.get(1).add(new Pair(2 , 1));
//		adj.get(2).add(new Pair(3 , 2));
//		adj.get(3).add(new Pair(4 , 3));
//		adj.get(4).add(new Pair(5 , 4));
//		adj.get(5).add(new Pair(6 , 5));
//		adj.get(2).add(new Pair(1 , 2));
//		adj.get(4).add(new Pair(3 , 2));
//		adj.get(6).add(new Pair(5 , 2));
//
//		SFGSolver solver = new SFGSolver(adj);
//		var fPaths = solver.getForwardPaths();
//		var fPathsGains = solver.getForwardPathsGains();
//		var loops = solver.getLoops();
//		var loopsGains = solver.getLoopGains();
//		var deltaArray = solver.getDeltaArray();
//		var num = solver.getNumerator();
//		var delta = solver.getDelta();
//		var sol = solver.getResult();
//		ArrayList < String > arrayList = new ArrayList<>();
//		StringBuilder stringBuilder = new StringBuilder();
//		stringBuilder.append("Forward Paths:\n");
//		for (int i = 0 ; i < fPaths.size() ; i++){
//			stringBuilder.append("   Path #").append(i + 1).append(": ");
//			getString(fPaths, fPathsGains, stringBuilder, i);
//			stringBuilder.append("   Delta #" ).append(i + 1).append(": ").append(deltaArray.get(i)).append("\n");
//			if(i != fPaths.size() - 1) stringBuilder.append("\n");
//		}
//		arrayList.add(stringBuilder.toString());
//		stringBuilder = new StringBuilder();
//		stringBuilder.append("Loops:\n");
//		for (int i = 0 ; i < loops.size() ; i++){
//			stringBuilder.append("   Loop #").append(i + 1).append(": ");
//			getString(loops, loopsGains, stringBuilder, i);
//			if(i != loops.size() - 1) stringBuilder.append("\n");
//		}
//		arrayList.add(stringBuilder.toString());
//		stringBuilder = new StringBuilder();
//		stringBuilder.append("Result:\n");
//		stringBuilder.append("   Y(s) / R(s) = ").append(num).append(" / ").append(delta).append(" = ").append(sol);
//		arrayList.add(stringBuilder.toString());
//		for(var s : arrayList) System.out.println(s);
	}

//	private static void getString(List<List<Integer>> lists, List<Integer> list, StringBuilder stringBuilder, int i) {
//		for (int j = 0 ; j < lists.get(i).size() ; j++){
//			var x = lists.get(i).get(j);
//			stringBuilder.append(x);
//			if(j != lists.get(i).size() - 1) stringBuilder.append(" -> ");
//		}
//		stringBuilder.append("\n   Gain #").append(i + 1).append(": ").append(list.get(i)).append("\n");
//	}
}
