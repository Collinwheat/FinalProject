package com.skilldistillery.RainbowRoadtripPlanner.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.RainbowRoadtripPlanner.entities.Comment;
import com.skilldistillery.RainbowRoadtripPlanner.entities.Trip;
import com.skilldistillery.RainbowRoadtripPlanner.entities.User;
import com.skilldistillery.RainbowRoadtripPlanner.entities.Vehicle;
import com.skilldistillery.RainbowRoadtripPlanner.repositories.CommentRepository;
import com.skilldistillery.RainbowRoadtripPlanner.repositories.UserRepository;

@Service
public class CommentServiceImpl implements CommentService {
	
	@Autowired
	private CommentRepository commentRepo;
	
	@Autowired
	private UserRepository userRepo;
	

	@Override
	public List<Comment> showAllTripComments(int id) {
		return commentRepo.findByTripId(id);
	}

	@Override
	public Comment show(String username, int id) {
		return commentRepo.findById(id);
	}

	@Override
	public Comment create(String username, Comment comment) {
		User user = userRepo.findByUsername(username);
		if(user != null) {
			return commentRepo.saveAndFlush(comment);
		}
		return null;
	}

	@Override
	public Comment update(String username, int id, Comment comment) {
		Comment existing = commentRepo.findByIdAndUser_Username(id, username);
		if (existing != null) {
			existing.setPhoto(existing.getPhoto());
			existing.setDescription(existing.getDescription());
//			existing.setActive(existing.getActive());
			commentRepo.saveAndFlush(existing);
			return existing;
		}
		return null;
	}

	@Override
	public boolean destroy(String username, int id) {
		boolean deleted = false;
		Comment toDelete = commentRepo.findByIdAndUser_Username(id, username);
		if(toDelete != null) {
			commentRepo.delete(toDelete);
			deleted = true;
		}
		return deleted;
	}

}