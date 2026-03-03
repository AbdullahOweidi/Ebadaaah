namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Supervisor extends Model
{
    // Override default plural naming to match your exact SQL table name
    protected $table = 'supervisor'; 
    
    // Disable timestamps since they do not exist in your schema
    public $timestamps = false;

    // Define which columns can be mass-assigned
    protected $fillable = [
        'name', 
        'phone_number', 
        'national_id', 
        'gender', 
        'age', 
        'license_id', 
        'years_of_experience', 
        'group_ID'
    ];
}