package Graph;

import java.util.ArrayList;
import java.util.List;

public class SFGSolver {
    private List<List<Pair>> adj = new ArrayList<>();
    private List<List<Integer>> forwardPaths = new ArrayList<>();
    private List<Integer> forwardPathsGains = new ArrayList<>();
    private List<List<Integer>> loops = new ArrayList<>();
    private List < Integer > loopGains = new ArrayList<>();

    public SFGSolver(List < List < Pair > > adj){
        this.adj = adj;
        PLAY();
    }

    private void PLAY(){
        computeLoops();
    }

    private int getPathGain(List < Integer > path){
        int g = 1;
        for (int i = 0 ; i + 1 < path.size() ; ++i){
            for (var pair : adj.get(path.get(i))){
                if(((Integer) pair.F).equals(path.get(i + 1))){
                    g *= pair.S;
                    break;
                }
            }
        }
        return g;
    }

    private void computeAllForwardPaths(){
        boolean[] visited = new boolean[adj.size()];
        List<Integer> currentPath = new ArrayList<>();
        currentPath.add(1);
        int n = (int) adj.size() - 1;
        forwardPathsDFS(1 , n , visited , currentPath);
        for (var path : forwardPaths){
            forwardPathsGains.add(getPathGain(path));
        }
    }

    private void forwardPathsDFS(int src, int dist , boolean[] visited , List <Integer> currentPath){
        
        if (src == dist){
            List<Integer> addList = new ArrayList<>(currentPath);
            forwardPaths.add(addList);
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

    private void computeLoops(){
        for (int i = 1 ; i < adj.size() ; i++){
            boolean[] visited = new boolean[adj.size()];
            for (int j = 1 ; j < i ; j++) visited[j] = true;
            List < Integer > loop = new ArrayList<>();
            loopDFS(i , i , visited , loop);
        }
        for(var loop : loops){
            loopGains.add(getPathGain(loop));
        }
//        for (int i = 0 ; i < loops.size() ; i++){
//            System.out.print("Loop #" + (i + 1) + ": ");
//            for (var x : loops.get(i)){
//                System.out.print(x + " ");
//            }
//            System.out.println("\nGain: " + loopGains.get(i));
//        }
    }

    private void loopDFS(int src , int start , boolean[] visited , List < Integer > loop){
        visited[src] = true;
        loop.add(src);
        for (var pair : adj.get(src)){
            if (!visited[pair.F]){
                loopDFS(pair.F , start , visited , loop);
            }else if(visited[pair.F] && pair.F == start){
                List < Integer > addList = new ArrayList<>(loop);
                addList.add(start);
                loops.add(addList);
            }
        }
        loop.remove(loop.size() - 1);
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

    public List<Integer> getLoopGains() {
        return loopGains;
    }

    public void setLoopGains(List<Integer> loopGains) {
        this.loopGains = loopGains;
    }
}
