package project.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import project.Util;
import project.model.ForumPost;

import com.google.appengine.api.datastore.Entity;

@SuppressWarnings("serial")
public class ForumPostServlet extends BaseServlet {

	private static final Logger logger = Logger.getLogger(ForumPostServlet.class.getCanonicalName());

	  /**
	   * Searches for the entity based on the search criteria and returns result in
	   * JSON format
	   */
	  protected void doGet(HttpServletRequest req, HttpServletResponse resp)
	      throws ServletException, IOException {
		//System.out.println("__ForumPostServlet doGet__");
	    super.doGet(req, resp);
	    logger.log(Level.INFO, "Obtaining ForumPost listing");
	    String searchBy = req.getParameter("searchBy");
	    String searchFor = req.getParameter("searchFor");
	    int offset=Integer.parseInt(req.getParameter("offset"));
	    if(offset<0){offset=0;}
	    PrintWriter out = resp.getWriter();
	    if (searchFor == null || searchFor.equals("")) {
	      Iterable<Entity> entities = ForumPost.getAllForumPosts(offset);
	      out.println(Util.writeJSON(entities));
	    } 
	    else{
	    	 Iterable<Entity> entities = ForumPost.getForumPost(searchBy,searchFor,offset);
		      out.println(Util.writeJSON(entities));
	    }
	  }

	  /**
	   * Creates entity and persists the same
	   */
	  protected void doPut(HttpServletRequest req, HttpServletResponse resp)
	      throws ServletException, IOException {
		//System.out.println("__ForumPostServlet doPut__");
	    logger.log(Level.INFO, "Creating ForumPost");
	    String Topic = req.getParameter("Topic");
	    String Content = req.getParameter("Content");
	    String Author = req.getParameter("Author");
	    ForumPost.create(Topic,Content,Author);
	  }

	  /**
	   * Delete the entity from the datastore. Throws an exception if there are any
	   * orders associated with the item and ignores the delete action for it.
	   */
	  protected void doDelete(HttpServletRequest req, HttpServletResponse resp)
	      throws ServletException, IOException {
		 // System.out.println("__ForumPostServlet doDelete__");
		logger.log(Level.INFO, "deleting ForumPost");
	    String itemKey = req.getParameter("searchFor");
	    PrintWriter out = resp.getWriter();
	    try{      
	      out.println(ForumPost.delete(itemKey));
	    } catch(Exception e) {
	      out.println(Util.getErrorMessage(e));
	    }      
	  }

	  /**
	   * Redirects to delete or insert entity based on the action in the HTTP
	   * request.
	   */
	  protected void doPost(HttpServletRequest req, HttpServletResponse resp)
	      throws ServletException, IOException {
		//System.out.println("__ForumPostServlet doPost__");
	    String action = req.getParameter("action");
	    if (action.equalsIgnoreCase("delete")) {
	      doDelete(req, resp);
	      return;
	    } else if (action.equalsIgnoreCase("put")) {
	      doPut(req, resp);
	      return;
	    }
	  }
}
