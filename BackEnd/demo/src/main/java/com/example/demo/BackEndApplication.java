package com.example.demo;

import Graph.Pair;
import Graph.SFGSolver;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class BackEndApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackEndApplication.class, args);

		List <List<Pair>> adj = new ArrayList<>();
		for (int i = 0 ; i < 6 ; i++) adj.add(new ArrayList<>());
		adj.get(1).add(new Pair(2 , 1));
		adj.get(2).add(new Pair(3 , 1));
		adj.get(3).add(new Pair(4 , 1));
		adj.get(4).add(new Pair(5 , 1));
		adj.get(2).add(new Pair(4 , 1));
		adj.get(3).add(new Pair(5 , 1));

		List<List<Integer>> paths = new SFGSolver(adj).getForwardPaths();

		for(int i=0;i<paths.size();i++){
			System.out.print("Path "+i+" :");
			for(int j=0;j<paths.get(i).size();j++){
				System.out.print(paths.get(i).get(j)+" ");
			}

			System.out.println();
		}
	}

}
