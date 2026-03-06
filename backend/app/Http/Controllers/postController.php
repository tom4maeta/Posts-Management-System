<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function index() {
        return response()->json(['posts' => Post::all()]);
    }

    public function createPost(Request $request) {
        $request->validate([
            'title' => 'required|string',
            'author' => 'required|string',
            'category' => 'required|string',
            'status' => 'required|string',
            'content' => 'required|longText',
        ]);

        $post = Post::create($request->only(['title','author','category','status','content']));
        return response()->json(['post' => $post], 201);
    }

    public function destroy($id) {
        Post::findOrFail($id)->delete();
        return response()->json(['message' => 'Post deleted'], 200);
    }
}