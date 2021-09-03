<?php

namespace App\Controller\Admin;

use App\Entity\Foodtruck;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\UrlField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class FoodtruckCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Foodtruck::class;
    }

    
    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            TextField::new('name'),
            NumberField::new('num_tel'),
            TextEditorField::new('overview'),
            UrlField::new('picture'),
            UrlField::new('instagram'),
            UrlField::new('twitter'),
            UrlField::new('facebook'),
            AssociationField::new('user'),
            AssociationField::new('sell_type_food'),
            DateTimeField::new('created_at')->hideOnForm(),
            DateTimeField::new('updated_at')->hideOnForm()
        ];
    }
    
}
