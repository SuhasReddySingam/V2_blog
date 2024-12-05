export const makeBlog=async(prompt)=>{
		let currentTitle = "";
		for await (const output of inference.textGenerationStream({
			model: model,
			inputs: "Generate a title for a blog post which is relevant to the following "+newPrompt+".Generate only a single title",
			parameters: { max_new_tokens: 800, return_full_text: false }
		  })) {
			  if(output.generated_text!=null){
				  currentTitle += output.generated_text;
			  }
		  }
		let currentOutput="";
		for await (const output of inference.textGenerationStream({
		  model: model,
		  inputs: currentTitle+".This is the title for a blog post now generate a blog post which is suitable for this title",
		  parameters: { max_new_tokens: 800, return_full_text: false }
		})) {
			if(output.generated_text!=null){
				setIsLoading(false);
				currentOutput += output.generated_text;
				setOutput(currentOutput);
				setBlog({...blog,body:currentOutput});
			}
		}
	   setBlog({...blog,title:title})
		console.log(title);
		console.log(out);
		console.log(user.name);
		console.log(newPrompt);
}