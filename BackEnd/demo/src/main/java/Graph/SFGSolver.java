package Graph;

import java.util.ArrayList;
import java.util.List;

public class SFGSolver {
    private List<List<Pair>> adj = new ArrayList<>();
    private List<List<Integer>> forwardPaths = new ArrayList<>();
    private List<Integer> forwardPathsGains = new ArrayList<>();
    private List<List<Integer>> loops = new ArrayList<>();

    public SFGSolver(List < List < Pair > > adj){
        this.adj = adj;
        computeAllForwardPaths();
    }

    private void computeAllForwardPaths(){
        boolean[] visited = new boolean[adj.size()];
        List<Integer> currentPath = new ArrayList<>();
        currentPath.add(1);
        int n = (int) adj.size() - 1;
        forwardPathsDFS(1 , n , visited , currentPath);
    }

    private void forwardPathsDFS(int src, int dist , boolean[] visited , List <Integer> currentPath){
        
        if (src == dist){
            List<Integer> addlist =  new ArrayList<>();
            addlist.addAll(currentPath);
            forwardPaths.add(addlist);
            return;
        }

        visited[src] = true;
        for (Pair pair : adj.get(src)){
            if(!visited[pair.F]){
                currentPath.add(pair.F);
                forwardPathsDFS(pair.F , dist , visited , currentPath);
                currentPath.remove((Integer)pair.F);
            }
        }
        visited[src] = false;
    }

    public List<List<Integer>> getForwardPaths() {
        return forwardPaths;
    }

    public void setForwardPaths(List<List<Integer>> forwardPaths) {
        this.forwardPaths = forwardPaths;
    }
    
    public List<Integer> getForwardPathsGains() {
        return forwardPathsGains;
    }

    public void setForwardPathsGains(List<Integer> forwardPathsGains) {
        this.forwardPathsGains = forwardPathsGains;
    }

    public List<List<Integer>> getLoops() {
        return loops;
    }

    public void setLoops(List<List<Integer>> loops) {
        this.loops = loops;
    }
}
