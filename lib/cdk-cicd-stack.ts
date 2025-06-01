import * as cdk from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { PipelineStage } from './pipeline-stage';

//adding comment to redeploy the project 1st commit failed and also the npm run build command because the build pipeline failed because of build

// Multi trail deploy failed because of LambdaStack which should be extends stack but I did it stage so now removing the npm run build command again to re-test

export class CdkCicdStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const pipeline = new CodePipeline(this, 'AwesomePipeline', {
			pipelineName: 'AwesomePipeline',
			synth: new ShellStep('Synth', {
				input: CodePipelineSource.gitHub('nansmatty/aws_cdk_cicd', 'main'),
				commands: ['npm ci', 'npx cdk synth'],
			}),
		});

		const testStage = pipeline.addStage(
			new PipelineStage(this, 'PipelineTestStage', {
				stageName: 'test',
			})
		);
	}
}
