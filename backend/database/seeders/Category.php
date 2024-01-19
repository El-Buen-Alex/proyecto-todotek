<?php

namespace Database\Seeders;

use App\Models\Category as ModelsCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Symfony\Component\Console\Output\ConsoleOutput;

class Category extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data=[
            [
                'name'=>'Categoría 1',
            ],
            [
                'name'=>'Categoría 2',
            ]
        ];

        foreach($data as $current_category){
            $current_slug=Str::slug($current_category['name']);
            $exists=ModelsCategory::where('slug', $current_slug)->first();
            $output = new ConsoleOutput();
            if(!$exists){
                $current=ModelsCategory::create([
                    'name'=>$current_category['name'],
                    'slug'=>$current_slug
                ]);
                $output->writeln("<info>".$current->name." created</info>");
            }else{
                $output->writeln("<info>".$exists->name." exists</info>");
            }
        }
    }
}
